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
            {/* Placeholder for actual video stream */}
            <div className="video-placeholder">
                <img
                    src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop"
                    alt="Live Stream Background"
                    className="video-bg"
                />
                <div className="video-overlay-gradient"></div>
            </div>

            <div className="video-controls">
                <div className="left-controls">
                    <button onClick={togglePlay} className="control-btn">
                        {isPlaying ? 'PAUSE' : <Play size={20} fill="currentColor" />}
                    </button>
                    <button onClick={toggleMute} className="control-btn">
                        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </button>
                    <div className="live-badge">
                        <div className="dot"></div>
                        LIVE
                    </div>
                    <span className="viewers">12.5k viewers</span>
                </div>

                <div className="right-controls">
                    <button className="control-btn">
                        <Maximize size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};
