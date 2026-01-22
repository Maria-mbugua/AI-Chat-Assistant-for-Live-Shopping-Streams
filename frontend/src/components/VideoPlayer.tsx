import React, { useState } from 'react';
import { Play, Volume2, VolumeX, Maximize } from 'lucide-react';
import './VideoPlayer.css';

export const VideoPlayer: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(true);

    const togglePlay = () => setIsPlaying(!isPlaying);
    const toggleMute = () => setIsMuted(!isMuted);

    return (
        <div className="video-container">
            {/* Realistic Live Video Stream */}
            <div className="video-wrapper">
                <video
                    className="video-bg"
                    autoPlay
                    muted={isMuted}
                    loop
                    playsInline
                    poster="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop"
                >
                    <source
                        src="https://assets.mixkit.co/videos/preview/mixkit-fashion-model-walking-on-a-city-street-4011-large.mp4"
                        type="video/mp4"
                    />
                    Your browser does not support the video tag.
                </video>
                <div className="video-overlay-gradient"></div>
            </div>

            <div className="video-controls">
                <div className="left-controls">
                    <button onClick={togglePlay} className="control-btn subtle">
                        {isPlaying ? null : <Play size={40} fill="white" className="center-play" />}
                    </button>
                    <button onClick={toggleMute} className="control-btn">
                        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </button>
                </div>

                <div className="right-controls">
                    <button className="control-btn">
                        <Maximize size={20} />
                    </button>
                </div>
            </div>
            <div className="bottom-gradient"></div>
        </div>
    );
};
