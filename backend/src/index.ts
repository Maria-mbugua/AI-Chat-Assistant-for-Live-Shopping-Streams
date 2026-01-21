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

    if (lowerText.includes('size') || lowerText.includes('fit')) {
      reply = "The model is wearing size M. It fits true to size!";
    } else if (lowerText.includes('canada') || lowerText.includes('ship')) {
      reply = "Yes, we ship worldwide, including Canada! 🇨🇦";
    } else if (lowerText.includes('available') || lowerText.includes('stock')) {
      reply = "Stock is running low! Only 3 left in this size. 🔥";
    } else if (lowerText.includes('material') || lowerText.includes('fabric')) {
      reply = "This piece is 100% vintage cotton. Super soft!";
    } else if (lowerText.includes('wash') || lowerText.includes('care')) {
      reply = "Machine wash cold, hang dry for best results.";
    } else if (lowerText.includes('hold') || lowerText.includes('reserve')) {
      reply = "We can't hold items, but you have 5 minutes to checkout once it's in your cart! ⏳";
    } else if (lowerText.includes('hi') || lowerText.includes('hello') || lowerText.includes('hey')) {
      reply = "Hey there! I'm ChatAssist. How can I help you with your shopping today? ✨";
    } else if (lowerText.includes('price') || lowerText.includes('cost')) {
      reply = "The price is shown right on the product card! It's currently on sale. 💸";
    } else if (lowerText.includes('shipping') || lowerText.includes('delivery')) {
      reply = "We offer standard and express shipping. Standard takes 3-5 business days!";
    } else if (lowerText.includes('return') || lowerText.includes('refund')) {
      reply = "We have a 30-day easy return policy. Shop with confidence! ✅";
    } else if (lowerText.includes('discount') || lowerText.includes('promo') || lowerText.includes('code')) {
      reply = "Use code LIVE10 for an extra 10% off right now! 🎟️";
    } else {
      reply = "I'm not quite sure about that, but feel free to ask about size, shipping, or our current promo codes!";
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