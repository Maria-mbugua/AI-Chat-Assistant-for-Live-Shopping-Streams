import express from 'express';
import { createServer } from 'http';
import WebSocket from 'ws';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3001;
const host = '0.0.0.0'; // Explicitly listen on all interfaces

app.use(cors());
app.use(express.json());

const server = createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', ws => {
  console.log('Client connected');

  ws.on('message', message => {
    const text = message.toString();
    console.log(`Received: ${text}`);

    // Process AI Response
    const lowerText = text.toLowerCase();
    let reply = "";

    if (lowerText.includes('size') || lowerText.includes('fit') || lowerText.includes('small') || lowerText.includes('large')) {
      reply = "Most of our apparel fits true to size! For accessories, we offer adjustable straps and standard sizing. Which item are you looking at? 😊";
    } else if (lowerText.includes('canada') || lowerText.includes('ship') || lowerText.includes('country') || lowerText.includes('worldwide')) {
      reply = "Yes, we ship to all countries worldwide! 🌍 No matter where you are, we'll get it to you.";
    } else if (lowerText.includes('available') || lowerText.includes('stock') || lowerText.includes('have')) {
      reply = "This product is currently **available**! We have it in sizes **S, M, L, and XL** and several colors. Which one can I help you find? 😊";
    } else if (lowerText.includes('material') || lowerText.includes('fabric')) {
      reply = "This piece is made of 100% premium vintage cotton. It's incredibly soft and durable! ✨";
    } else if (lowerText.includes('wash') || lowerText.includes('care')) {
      reply = "Machine wash cold, hang dry for best results.";
    } else if (lowerText.includes('hold') || lowerText.includes('reserve')) {
      reply = "We can't hold items, but you have 5 minutes to checkout once it's in your cart! ⏳";
    } else if (lowerText.includes('hi') || lowerText.includes('hello') || lowerText.includes('hey')) {
      reply = "Hello! I'm ChatAssist AI. How can I help you with your shopping today? I can answer questions about size, material, shipping, and more! 👋✨";
    } else if (lowerText.includes('price') || lowerText.includes('cost')) {
      reply = "The price is shown right on the product card! It's currently on sale. 💸";
    } else if (lowerText.includes('shipping') || lowerText.includes('delivery')) {
      reply = "We offer standard and express shipping to all countries. Standard delivery typically takes 3-7 business days worldwide! 🚛";
    } else if (lowerText.includes('return') || lowerText.includes('refund')) {
      reply = "We have a 30-day easy return policy for all orders worldwide. Shop with confidence! ✅";
    } else if (lowerText.includes('discount') || lowerText.includes('promo') || lowerText.includes('code')) {
      reply = "Use code LIVE10 for an extra 10% off right now! 🎟️";
    } else {
      reply = "I'm not quite sure about that, but feel free to ask about size, shipping, material, or our current promo codes! I'm here to help.";
    }

    // Send the response with a natural delay
    setTimeout(() => {
      ws.send(JSON.stringify({
        text: reply,
        sender: 'ai',
        username: 'ChatAssist AI'
      }));
    }, 1000 + Math.random() * 1000);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });

  ws.on('error', error => {
    console.error('WebSocket error:', error);
  });
});

app.get('/', (req, res) => {
  res.send('AI Chat Assistant Backend is running!');
});

server.listen({ port, host }, () => {
  console.log(`Server listening on ${host}:${port}`);
});