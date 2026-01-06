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
        if (!imageOverlayRef.current || !backdropRef.current) {
            return;
        }

        const { imageRect, offering } = activeItem;

        // --- CALCULATION PHASE ---
        const isDesktop = window.innerWidth >= 1024;
        const targetHeroHeight = isDesktop ? window.innerHeight - 80 : 450;

        // --- SETUP PHASE ---
        document.body.style.overflow = 'hidden';

        // Set initial states - Z-Indices MUST be below 40 (Header is z-40)
        gsap.set(backdropRef.current, { opacity: 0, zIndex: 30 });
        gsap.set(imageOverlayRef.current, {
            position: 'fixed',
            top: imageRect.top,
            left: imageRect.left,
            width: imageRect.width,
            height: imageRect.height,
            zIndex: 35,
            borderRadius: '1px',
            overflow: 'hidden',
            backgroundColor: '#002B4E'
        });

        // --- ANIMATION PHASE ---
        if (timelineRef.current) timelineRef.current.kill();

        const tl = gsap.timeline({
            onStart: () => {
                if (isMounted && lastLoggedIdRef.current !== offering.id) {
                    logTransition('Animation Started');
                    lastLoggedIdRef.current = offering.id;
                }
                setTransitionState({ isTransitioning: true, phase: 'animating' });
            },
            onComplete: () => {
                if (!isMounted) return;

                logTransition('Video Motion Complete -> Holding for 1s');

                // Requirement: Wait 1s after video transition completes before showing content
                setTimeout(() => {
                    if (!isMounted) return;

                    logTransition('Hold Complete -> Fading Overlays & Releasing Content');
                    setTransitionState({ isTransitioning: false, phase: 'complete' });

                    // Smoothly fade out the transition elements as the real page takes over
                    gsap.to([imageOverlayRef.current, backdropRef.current], {
                        opacity: 0,
                        duration: 0.6,
                        ease: "power2.inOut",
                        onComplete: () => {
                            if (!isMounted) return;
                            setActiveItem(null);
                            lastLoggedIdRef.current = null;
                            document.body.style.overflow = '';
                        }
                    });
                }, 1000);
            }
        });

        timelineRef.current = tl;

        // Navigation happens early to allow underlying page to mount
        setTimeout(() => {
            if (isMounted) {
                setTransitionState({ isTransitioning: true, phase: 'navigating' });
                navigate(`/course/${offering.id}`);
            }
        }, 100);

        // FLIP Animation sequence
        tl.to(imageOverlayRef.current, {
            top: 80, // Land below the 80px fixed header
            left: 0,
            width: '100vw',
            height: targetHeroHeight,
            borderRadius: 0,
            duration: 0.8,
            ease: "expo.inOut"
        });

        tl.to(backdropRef.current, {
            opacity: 1,
            duration: 0.3
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
                    <div ref={backdropRef} className="fixed inset-0 bg-white z-[30] pointer-events-none" />

                    {/* 1. Media Overlay (Video or Image) */}
                    <div
                        ref={imageOverlayRef}
                        className="bg-brand-primary pointer-events-none shadow-2xl overflow-hidden"
                    >
                        {activeItem.offering.video ? (
                            <video
                                src={activeItem.offering.video}
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="w-full h-full object-cover opacity-70"
                            />
                        ) : (
                            <img
                                src={activeItem.offering.image}
                                className="w-full h-full object-cover opacity-70"
                                alt=""
                            />
                        )}
                        {/* Match Hero Overlays */}
                        <div className="absolute inset-0 bg-brand-primary/30 z-10" />
                        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary via-brand-primary/50 to-transparent z-10" />
                    </div>
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
