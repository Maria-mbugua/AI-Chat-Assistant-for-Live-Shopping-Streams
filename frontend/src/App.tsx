import { Sparkles } from 'lucide-react';
import { Chat } from './components/Chat';
import { VideoPlayer } from './components/VideoPlayer';
import { ProductOverlay } from './components/ProductOverlay';
import './App.css';
import './LiveApp.css';

function App() {
  return (
    <div className="live-app-layout dark-theme">
      <div className="app-title">
        <Sparkles size={20} className="text-pink-500" />
        <span>ChatAssist Live</span>
      </div>
      <VideoPlayer />

      <div className="live-product-wrapper">
        <ProductOverlay />
      </div>

      <div className="live-chat-wrapper">
        <Chat />
      </div>
    </div>
  );
}

export default App;
