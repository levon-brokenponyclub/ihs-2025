import React, { createContext, useContext, useState, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { Offering } from '../types';
import { useNavigate } from 'react-router-dom';

interface TransitionState {
    isTransitioning: boolean;
    phase: 'idle' | 'animating' | 'navigating' | 'complete';
}

interface TransitionContextType {
    startTransition: (offering: Offering, imageRect: DOMRect, textRect: DOMRect, categoryRect: DOMRect) => void;
    debugMode: boolean;
    toggleDebug: () => void;
    transitionState: TransitionState;
}

const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

// --- 1. VISUAL DEBUG HELPERS ---
const createDebugBox = (id: string, rect: DOMRect, color: string, label: string) => {
    // Cleanup existing
    const existing = document.getElementById(`debug-${id}`);
    if (existing) existing.remove();

    const div = document.createElement('div');
    div.id = `debug-${id}`;
    div.style.position = 'fixed';
    div.style.top = `${rect.top}px`;
    div.style.left = `${rect.left}px`;
    div.style.width = `${rect.width}px`;
    div.style.height = `${rect.height}px`;
    div.style.border = `2px dashed ${color}`;
    div.style.zIndex = '9999';
    div.style.pointerEvents = 'none';
    div.style.opacity = '0.8';
    
    const span = document.createElement('span');
    span.innerText = label;
    span.style.color = 'white';
    span.style.backgroundColor = color;
    span.style.fontSize = '10px';
    span.style.fontWeight = 'bold';
    span.style.fontFamily = 'monospace';
    span.style.padding = '2px 4px';
    span.style.position = 'absolute';
    span.style.top = '-20px';
    span.style.left = '-2px';
    span.style.whiteSpace = 'nowrap';
    span.style.borderRadius = '2px 2px 0 0';
    
    div.appendChild(span);
    document.body.appendChild(div);
};

const clearDebugBoxes = () => {
    document.querySelectorAll('[id^="debug-"]').forEach(el => el.remove());
};

// --- 2. LOGGING HELPER ---
const logTransition = (step: string, details?: any) => {
    // Only log specific transition events with styling to make them stand out
    console.log(
        `%c[Transition] ${step}`, 
        'color: #C2B067; font-weight: bold; background: #002B4E; padding: 2px 4px; border-radius: 2px;', 
        details || ''
    );
};

export const TransitionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [debugMode, setDebugMode] = useState(false);
    const [activeItem, setActiveItem] = useState<{ 
        offering: Offering; 
        imageRect: DOMRect; 
        textRect: DOMRect;
        categoryRect: DOMRect;
    } | null>(null);

    // New transition state exposed to consumers
    const [transitionState, setTransitionState] = useState<TransitionState>({ isTransitioning: false, phase: 'idle' });

    // Refs for the temporary transition elements
    const imageOverlayRef = useRef<HTMLDivElement>(null);
    const textOverlayRef = useRef<HTMLHeadingElement>(null);
    const categoryOverlayRef = useRef<HTMLSpanElement>(null);
    const backdropRef = useRef<HTMLDivElement>(null); 
    const timelineRef = useRef<gsap.core.Timeline | null>(null);
    
    // Deduplication ref for Strict Mode logging
    const lastLoggedIdRef = useRef<string | null>(null);
    
    const navigate = useNavigate();

    const toggleDebug = () => {
        setDebugMode(prev => {
            const newVal = !prev;
            if (!newVal) clearDebugBoxes();
            logTransition(`Debug Mode: ${newVal ? 'ON' : 'OFF'}`);
            return newVal;
        });
    };

    const startTransition = (offering: Offering, imageRect: DOMRect, textRect: DOMRect, categoryRect: DOMRect) => {
        // 1. Draw debug boxes if enabled
        if (debugMode) {
            clearDebugBoxes();
            createDebugBox('img', imageRect, '#1E90FF', `Image (${Math.round(imageRect.width)}x${Math.round(imageRect.height)})`);
            createDebugBox('txt', textRect, '#32CD32', 'Text Source');
            createDebugBox('cat', categoryRect, '#FFA500', 'Category Badge');
        }

        // 2. Log start
        logTransition('Start Initiated', { 
            title: offering.title,
            id: offering.id
        });
        
        // 3. Set state to mount the overlay elements
        setActiveItem({ offering, imageRect, textRect, categoryRect });

        // Also mark transition state as animating so pages can react immediately
        setTransitionState({ isTransitioning: true, phase: 'animating' });
    };

    // Use useLayoutEffect to prevent FOUC (Flash of Unstyled Content) during animation setup
    useLayoutEffect(() => {
        let isMounted = true;
        
        if (!activeItem) return;

        // Safety check for refs
        if (!imageOverlayRef.current || !textOverlayRef.current || !backdropRef.current || !categoryOverlayRef.current) {
            return;
        }

        const { imageRect, textRect, categoryRect, offering } = activeItem;
        
        // --- CALCULATION PHASE ---
        const headerHeight = 80;
        const isDesktop = window.innerWidth >= 1024;
        const targetHeroHeight = isDesktop ? window.innerHeight * 0.8 : window.innerHeight * 0.5;
        
        // Target Text Position Logic
        const containerPadding = isDesktop ? 32 : 16;
        const maxContainerWidth = 1280;
        const windowWidth = window.innerWidth;
        const targetTextLeft = windowWidth > maxContainerWidth 
            ? (windowWidth - maxContainerWidth) / 2 + containerPadding 
            : containerPadding;
        
        const targetTextBottom = isDesktop ? 64 : 32; 
        const targetTextTop = headerHeight + targetHeroHeight - targetTextBottom - 80; 

        // --- SETUP PHASE ---
        document.body.style.overflow = 'hidden';

        // OPTIMIZATION: Z-Indices set below 40 (Header is 40) to keep Header visible
        gsap.set(backdropRef.current, { opacity: 0, zIndex: 30 });
        gsap.set(imageOverlayRef.current, {
            position: 'fixed',
            top: imageRect.top,
            left: imageRect.left,
            width: imageRect.width,
            height: imageRect.height,
            zIndex: 35, // Below Header (40), Above Content
            borderRadius: '1rem',
            objectFit: 'cover'
        });
        gsap.set(categoryOverlayRef.current, {
            position: 'fixed',
            top: categoryRect.top,
            left: categoryRect.left,
            width: categoryRect.width,
            zIndex: 36,
            fontSize: '10px',
            opacity: 1
        });
        gsap.set(textOverlayRef.current, {
            position: 'fixed',
            top: textRect.top,
            left: textRect.left,
            width: textRect.width,
            zIndex: 36,
            margin: 0,
            color: '#002B4E',
            fontSize: isDesktop ? '1.25rem' : '1.125rem',
            lineHeight: 1.25,
            fontWeight: 700,
            fontFamily: '"Playfair Display", serif'
        });

        // --- ANIMATION PHASE ---
        // Kill previous timeline if exists (React Strict Mode safety)
        if (timelineRef.current) timelineRef.current.kill();

        const tl = gsap.timeline({
            onStart: () => {
                // Strict Mode Check: Prevent duplicate logging for same item
                if (isMounted && lastLoggedIdRef.current !== offering.id) {
                    logTransition('Animation Started');
                    lastLoggedIdRef.current = offering.id;
                }
                // Mark that we're animating
                setTransitionState({ isTransitioning: true, phase: 'animating' });
            },
            onComplete: () => {
                if (!isMounted) return;
                
                logTransition('Animation Complete -> Cleanup');
                
                // When the GSAP animation completes we mark the transition as complete/finished
                setTransitionState({ isTransitioning: false, phase: 'complete' });

                if (debugMode) {
                    setTimeout(() => {
                        if (isMounted) clearDebugBoxes();
                    }, 2000);
                }

                // Fade out overlays to reveal actual page content
                gsap.to([imageOverlayRef.current, textOverlayRef.current, categoryOverlayRef.current, backdropRef.current], {
                    opacity: 0,
                    duration: 0.3, 
                    ease: "power2.inOut",
                    onComplete: () => {
                        if (!isMounted) return;
                        setActiveItem(null); // Unmount overlays
                        lastLoggedIdRef.current = null; // Reset logged ID
                        document.body.style.overflow = '';
                    }
                });
            }
        });
        
        timelineRef.current = tl;

        // Perform Navigation immediately so the underlying page is ready when we fade out
        // Mark that we're navigating (so pages can keep hero background visible but hide content)
        setTransitionState({ isTransitioning: true, phase: 'navigating' });
        navigate(`/course/${offering.id}`);

        // The FLIP Animation
        tl.to(imageOverlayRef.current, {
            top: 0, // Animate to 0 (under header) to match destination page Hero
            left: 0,
            width: '100vw',
            height: targetHeroHeight,
            borderRadius: 0,
            opacity: 0.6,
            backgroundColor: '#002B4E',
            duration: 0.8,
            ease: "expo.inOut"
        });

        tl.to(textOverlayRef.current, {
            top: targetTextTop,
            left: targetTextLeft,
            color: '#FFFFFF',
            fontSize: isDesktop ? '3.75rem' : '1.875rem',
            width: isDesktop ? '60%' : '90%',
            duration: 0.8,
            ease: "expo.inOut"
        }, "<");

        tl.to(categoryOverlayRef.current, {
            top: targetTextTop - 40,
            left: targetTextLeft,
            backgroundColor: '#C2B067',
            color: '#002B4E',
            borderColor: '#C2B067',
            duration: 0.8,
            ease: "expo.inOut"
        }, "<");

        tl.to(backdropRef.current, {
            opacity: 1,
            duration: 0.2
        }, "<");

        return () => { 
            isMounted = false;
            document.body.style.overflow = ''; 
            if (timelineRef.current) timelineRef.current.kill();
        };
    }, [activeItem, navigate, debugMode]);

    return (
        <TransitionContext.Provider value={{ startTransition, debugMode, toggleDebug, transitionState }}>
            {children}
            
            {activeItem && (
                <>
                    {/* Backdrop covers the listing page while transition happens */}
                    <div ref={backdropRef} className="fixed inset-0 bg-white pointer-events-none" />
                    
                    {/* 1. Image Layer */}
                    <div 
                        ref={imageOverlayRef} 
                        className="overflow-hidden bg-brand-primary pointer-events-none shadow-2xl"
                    >
                        <img 
                            src={activeItem.offering.image} 
                            className="w-full h-full object-cover"
                            alt=""
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-primary via-brand-primary/60 to-transparent"></div>
                    </div>

                    {/* 2. Category Layer */}
                    <span 
                        ref={categoryOverlayRef}
                        className="pointer-events-none bg-[#f8fafc] border border-[#eff4f7] text-[#002a4e] text-[10px] font-bold px-3 py-1.5 uppercase tracking-widest rounded-sm shadow-sm flex items-center justify-center whitespace-nowrap"
                    >
                        {activeItem.offering.category}
                    </span>

                    {/* 3. Text Layer */}
                    <h3
                        ref={textOverlayRef}
                        className="pointer-events-none transform-origin-top-left"
                    >
                        {activeItem.offering.title}
                    </h3>
                </>
            )}
        </TransitionContext.Provider>
    );
};

export const useTransition = () => {
    const context = useContext(TransitionContext);
    if (!context) throw new Error('useTransition must be used within TransitionProvider');
    return context;
};
