import { Chat } from './components/Chat';
import { VideoPlayer } from './components/VideoPlayer';
import { ProductOverlay } from './components/ProductOverlay';
import './App.css';
import './LiveApp.css';

function App() {
  return (
    <div className="live-app-layout dark-theme">
      <div className="stream-container">
        {/* TikTok Style Header */}
        <div className="app-header">
          <div className="profile-info">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
              alt="Streamer"
              className="profile-pic"
            />
            <div className="user-meta">
              <h4>Maria Fashion</h4>
              <span>120.5k followers</span>
            </div>
          </div>
          <div className="live-stats">
            <div className="viewer-count">
              12.5k viewers
            </div>
          </div>
        </div>

        <VideoPlayer />

        <div className="live-product-wrapper">
          <ProductOverlay />
        </div>

        <div className="live-chat-wrapper">
          <Chat />
        </div>
      </div>
    </div>
  );
}

export default App;
