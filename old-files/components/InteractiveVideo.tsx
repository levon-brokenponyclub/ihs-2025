
import React, { useState, useRef, useEffect } from 'react';
import { X, Volume2, VolumeX, Play, Pause, Maximize2 } from 'lucide-react';

export const InteractiveVideo: React.FC = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [isMuted, setIsMuted] = useState(true);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isExpanded, setIsExpanded] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const toggleMute = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const togglePlay = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
        // Ensure sound is on when expanded (optional UX choice)
        if (!isExpanded && isMuted && videoRef.current) {
            videoRef.current.muted = false;
            setIsMuted(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div 
            className={`fixed z-[90] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] shadow-2xl ${
                isExpanded 
                ? 'bottom-8 right-8 w-[350px] md:w-[400px] h-[600px] rounded-2xl' 
                : 'bottom-8 right-8 w-32 h-48 md:w-40 md:h-64 rounded-xl hover:scale-105 cursor-pointer'
            }`}
            onClick={!isExpanded ? toggleExpand : undefined}
        >
            <div className="relative w-full h-full overflow-hidden rounded-[inherit] bg-black border-4 border-white shadow-lg">
                {/* Close Button (Only when expanded) */}
                {isExpanded && (
                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsExpanded(false);
                        }}
                        className="absolute top-4 right-4 z-20 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 backdrop-blur-sm"
                    >
                        <X size={16} />
                    </button>
                )}

                {/* Close Widget entirely (Only when collapsed) */}
                {!isExpanded && (
                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsOpen(false);
                        }}
                        className="absolute -top-3 -right-3 z-20 bg-white text-black p-1 rounded-full shadow-md hover:bg-gray-200 border border-gray-100"
                    >
                        <X size={12} />
                    </button>
                )}

                {/* Video Element */}
                <video
                    ref={videoRef}
                    src="https://videos.pexels.com/video-files/3129671/3129671-hd_1920_1080_30fps.mp4" 
                    className="w-full h-full object-cover"
                    autoPlay
                    muted={isMuted}
                    loop
                    playsInline
                />

                {/* Overlay Controls */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-4 transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 hover:opacity-100'}`}>
                    <div className="flex items-center justify-between text-white">
                        <div className="flex flex-col">
                            <span className="text-xs font-bold uppercase tracking-wider text-brand-gold">Welcome</span>
                            <span className="text-sm font-bold">Discover Your Future</span>
                        </div>
                        
                        {isExpanded && (
                            <div className="flex gap-2">
                                <button onClick={togglePlay} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                                    {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                                </button>
                                <button onClick={toggleMute} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                                    {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
