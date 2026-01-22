# AI Chat Assistant for Live Shopping Streams 📱✨

A premium, AI-powered live shopping platform designed to mimic the immersive **TikTok Live** experience. This application features a high-end vertical UI, real-time "Visual Search" capabilities, and an intelligent AI Assistant that handles complex customer inquiries instantly.

## 📺 Demo

Check out the application in action: [Watch Demo on Loom](https://www.loom.com/share/4315a0766dc24191b75ff18a7fe6cfaa)

## ✨ Features

- **TikTok-Style Live Layout:** Vertical, portrait-oriented stream container with overlaid transparent panels and streamer profile headers.
- **Visual Search (Screenshot Paste):** Users can capture a screenshot of any product in the stream and paste it (Ctrl+V) directly into the chat. The AI "scans" the image and identifies the product details.
- **Multi-Modal Interaction:** Attach an image and type specific instructions or questions in a single message for the AI to process.
- **Auto-Rotating Product Showcase:** A dynamic shopping anchor that automatically cycles through a curated catalog of 10+ items during the live session.
- **AI Chat Assistant:** Real-time AI that handles availability, size/fit guide, materials, worldwide shipping, and discount codes.
- **Glassmorphism UI/UX:** Sleek, modern design with floating message bubbles, semi-transparent overlays, and smooth animations.
- **Robust Real-Time Chat:** WebSocket-powered communication with local AI fallback and safety timeouts for 100% response reliability.
- **Interactive Video Player:** Immersive background video with subtle controls and heavy bottom-heavy gradients for maximum chat readability.

## 🚀 Tech Stack

- **Frontend:** React, TypeScript, Vite, Lucide React (Icons), Vanilla CSS (Custom Design System).
- **Backend:** Node.js, Express, WebSocket (Real-time communication).
- **Styling:** Custom CSS with Glassmorphism, CSS Animations, and TikTok-inspired portrait layouts.

## 🛠️ Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Maria-mbugua/AI-Chat-Assistant-for-Live-Shopping-Streams.git
   cd AI-Chat-Assistant-for-Live-Shopping-Streams
   ```

2. **Setup Backend:**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

3. **Setup Frontend:**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

4. **Access the App:**
   Open your browser and navigate to `http://localhost:5173`.

## 🤖 AI Capabilities

The **ChatAssist AI** is designed to handle various shopping-related queries:
- **Visual Recognition:** "I've scanned your screenshot! That's our Cyberpunk Leather Jacket..."
- **Product Availability:** Confirming stock levels and listing available sizes (S, M, L, XL).
- **Material & Care:** Detailed information on fabrics (e.g., 100% Premium Cotton) and washing instructions.
- **Logistics:** Worldwide shipping support for every country with 3-7 day delivery windows.
- **Promotions:** Instant discount codes like `LIVE10`.

## 📄 License

This project is licensed under the MIT License.
