import React, { useEffect, useRef, useState } from 'react';
import { Send, User, Sparkles, Bot, X } from 'lucide-react';
import './Chat.css';

interface Message {
    id: string;
    text: string;
    sender: 'me' | 'server' | 'user' | 'ai';
    username?: string;
    timestamp: number;
    image?: string; // Base64 or URL for the pasted screenshot
}

const RANDOM_USERS = ['Sarah_J', 'Mike88', 'FashionLvr', 'CoolCat', 'JerseyFan', 'Alex_Shopping', 'Emma_Style', 'David_K'];
const RANDOM_QUESTIONS = [
    "What size is that?",
    "Does this ship to Australia?",
    "Is this still available in Red?",
    "Can you show the fabric up close?",
    "What's the material?",
    "How does it fit on the shoulders?",
    "Is it machine washable?",
    "Love this piece! 😍",
    "Just ordered mine!",
    "Are there any other colors?",
    "Whats the return policy again?",
    "How long is shipping to the UK?"
];

export const Chat: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [pendingImage, setPendingImage] = useState<string | null>(null);
    const [isTyping, setIsTyping] = useState(false);
    const [productContext, setProductContext] = useState<string | null>(null);
    const ws = useRef<WebSocket | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const lastQuestionRef = useRef<string>('');

    // AI Visual Recognition Logic (Simulated)
    const processImageScan = (_imageData: string, userNotes?: string) => {
        setIsTyping(true);
        setTimeout(() => {
            let reply = "";
            let identifiedProduct = "";
            const notes = userNotes?.toLowerCase() || "";

            if (notes.includes('material') || notes.includes('fabric')) {
                reply = "I've analyzed the texture in your screenshot! This specific item is our **100% Cotton Premium Blend**. It's very durable and breathable. ✨";
                identifiedProduct = "100% Cotton Premium Blend Item";
            } else if (notes.includes('price') || notes.includes('cost')) {
                reply = "Scanned! The item in your image is priced at **$299**. It's currently one of our top-tier featured pieces! 💸";
                identifiedProduct = "the $299 featured piece";
            } else if (notes.includes('available') || notes.includes('stock') || notes.includes('have')) {
                reply = "Yes, this product is currently **available**! We have it in sizes **S, M, L, and XL**. Which color were you looking for? 😊";
                identifiedProduct = "the available item in the screenshot";
            } else {
                const products = [
                    { name: "Cyberpunk Leather Jacket", reply: "I've scanned your screenshot! That's our **Cyberpunk Leather Jacket**. It's incredibly stylish and fits true to size! 🔥" },
                    { name: "Urban Street Hoodie", reply: "Analyzing image... Spotted! That's the **Urban Street Hoodie**. We have it in all sizes from S to XL." },
                    { name: "Premium Canvas Sneakers", reply: "Recognized! Those are the **Premium Canvas Sneakers**. They're extremely popular right now. 🌍" }
                ];
                const selected = products[Math.floor(Math.random() * products.length)];
                reply = selected.reply;
                identifiedProduct = selected.name;
            }

            setProductContext(identifiedProduct);
            setMessages(prev => [...prev, {
                id: Date.now().toString() + Math.random(),
                text: reply,
                sender: 'ai',
                username: 'ChatAssist AI',
                timestamp: Date.now()
            }]);
            setIsTyping(false);
        }, 2000);
    };

    // AI Text Logic
    const processAIResponse = (text: string) => {
        const lowerText = text.toLowerCase();
        let reply = '';

        if (lowerText.includes('size') || lowerText.includes('fit') || lowerText.includes('small') || lowerText.includes('large')) {
            reply = productContext
                ? `The **${productContext}** fits true to size! We offer it in sizes S, M, L, and XL. Which size do you usually wear? 😊`
                : "Most of our apparel fits true to size! For accessories, we offer adjustable straps and standard sizing. Which item are you looking at? 😊";
        } else if (lowerText.includes('ship') || lowerText.includes('country') || lowerText.includes('worldwide') || lowerText.includes('australia') || lowerText.includes('uk')) {
            reply = "Yes, we ship to all countries worldwide! 🌍 No matter where you are, we'll get it to you.";
        } else if (lowerText.includes('available') || lowerText.includes('stock') || lowerText.includes('have')) {
            reply = productContext
                ? `Yes, the **${productContext}** is currently **available**! We have it in sizes **S, M, L, and XL**. 😊`
                : "This product is currently **available**! We have it in sizes **S, M, L, and XL** and several colors. Which one can I help you find? 😊";
        } else if (lowerText.includes('material') || lowerText.includes('fabric')) {
            reply = productContext
                ? `The **${productContext}** is made of 100% premium vintage cotton. It's incredibly soft and durable! ✨`
                : "This piece is made of 100% premium vintage cotton. It's incredibly soft and durable! ✨";
        } else if (lowerText.includes('wash') || lowerText.includes('care')) {
            reply = "Machine wash cold, hang dry for best results.";
        } else if (lowerText.includes('hold') || lowerText.includes('reserve')) {
            reply = "We can't hold items, but you have 5 minutes to checkout once it's in your cart! ⏳";
        } else if (lowerText.includes('hi') || lowerText.includes('hello') || lowerText.includes('hey')) {
            reply = "Hello! I'm ChatAssist AI. How can I help you with your shopping today? 👋✨";
        } else if (lowerText.includes('price') || lowerText.includes('cost')) {
            reply = productContext
                ? `The **${productContext}** is priced at **$299**. It's currently on sale! 💸`
                : "The price is shown right on the product card! It's currently on sale. 💸";
        } else if (lowerText.includes('discount') || lowerText.includes('promo') || lowerText.includes('code')) {
            reply = "Use code LIVE10 for an extra 10% off right now! 🎟️";
        } else if (lowerText.includes('return') || lowerText.includes('refund')) {
            reply = "We have a 30-day easy return policy for all orders worldwide. Shop with confidence! ✅";
        } else if (lowerText.includes('shipping') || lowerText.includes('delivery')) {
            reply = "We offer standard and express shipping to all countries. Standard delivery typically takes 3-7 business days worldwide! 🚛";
        }

        if (reply) {
            setTimeout(() => {
                setMessages(prev => [...prev, {
                    id: Date.now().toString() + Math.random(),
                    text: reply,
                    sender: 'ai',
                    username: 'ChatAssist AI',
                    timestamp: Date.now()
                }]);
                setIsTyping(false);
            }, 1000 + Math.random() * 1000);
        } else {
            setIsTyping(false);
        }
    };

    // Simulate random user messages
    useEffect(() => {
        const interval = setInterval(() => {
            if (Math.random() > 0.6) {
                let randomMsg = RANDOM_QUESTIONS[Math.floor(Math.random() * RANDOM_QUESTIONS.length)];
                while (randomMsg === lastQuestionRef.current) {
                    randomMsg = RANDOM_QUESTIONS[Math.floor(Math.random() * RANDOM_QUESTIONS.length)];
                }
                lastQuestionRef.current = randomMsg;
                const randomUser = RANDOM_USERS[Math.floor(Math.random() * RANDOM_USERS.length)];

                setMessages(prev => [...prev, {
                    id: Date.now().toString() + Math.random(),
                    text: randomMsg,
                    sender: 'user',
                    username: randomUser,
                    timestamp: Date.now()
                }]);

                if (randomMsg.includes('?') || randomMsg.includes('size') || randomMsg.includes('ship')) {
                    setIsTyping(true);
                    processAIResponse(randomMsg);
                }
            }
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        ws.current = new WebSocket('ws://localhost:3001');
        ws.current.onopen = () => {
            console.log('Connected to chat server');
            setMessages(prev => [...prev, {
                id: 'system-1',
                text: 'ChatAssist AI is active. You can now paste screenshots to scan products! 📸',
                sender: 'server',
                username: 'System',
                timestamp: Date.now()
            }]);
        };
        ws.current.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                if (data.sender === 'ai') {
                    setIsTyping(false);
                    setMessages(prev => [...prev, {
                        id: Date.now().toString() + Math.random(),
                        text: data.text,
                        sender: 'ai',
                        username: data.username,
                        timestamp: Date.now()
                    }]);
                }
            } catch (e) { console.error('Error parsing message:', e); }
        };
        return () => ws.current?.close();
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    const handlePaste = (e: React.ClipboardEvent) => {
        const items = e.clipboardData.items;
        for (let i = 0; i < items.length; i++) {
            if (items[i].type.indexOf('image') !== -1) {
                const file = items[i].getAsFile();
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        const base64 = event.target?.result as string;
                        setPendingImage(base64);
                    };
                    reader.readAsDataURL(file);
                }
            }
        }
    };

    const sendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() && !pendingImage) return;

        const currentInput = input || (pendingImage ? "Shared a screenshot..." : "");
        const currentImage = pendingImage;
        let sentViaWS = false;

        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(JSON.stringify({ text: currentInput, image: currentImage, context: productContext }));
            sentViaWS = true;
        }

        setMessages(prev => [...prev, {
            id: Date.now().toString(),
            text: currentInput,
            sender: 'me',
            username: 'You',
            timestamp: Date.now(),
            image: currentImage || undefined
        }]);

        setIsTyping(true);

        if (currentImage) {
            processImageScan(currentImage, input);
        } else if (!sentViaWS) {
            processAIResponse(currentInput);
        } else {
            setTimeout(() => {
                setIsTyping(current => {
                    if (current) {
                        processAIResponse(currentInput);
                        return false;
                    }
                    return false;
                });
            }, 5000);
        }

        setInput('');
        setPendingImage(null);
    };

    return (
        <div className="chat-container glass-panel">
            <div className="chat-header">
                <h3>Live Chat</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className="ai-badge">
                        <Sparkles size={12} /> AI Active
                    </span>
                    <span className="live-indicator">LIVE</span>
                </div>
            </div>

            <div className="chat-messages">
                {messages.map((msg) => (
                    <div key={msg.id} className={`message ${msg.sender}`}>
                        <div className="avatar">
                            {msg.sender === 'ai' ? <Bot size={14} /> : <User size={14} />}
                        </div>
                        <div className="message-content">
                            <span className={`username ${msg.sender === 'ai' ? 'ai-name' : ''}`}>
                                {msg.username || 'User'}
                            </span>
                            {msg.image && (
                                <div className="message-image">
                                    <img src={msg.image} alt="User screenshot" />
                                    <div className="scan-indicator">
                                        <Sparkles size={12} /> Visual Search
                                    </div>
                                </div>
                            )}
                            <p dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') }} />
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="message ai typing">
                        <div className="avatar">
                            <Bot size={14} />
                        </div>
                        <div className="message-content">
                            <span className="username ai-name">ChatAssist AI</span>
                            <div className="typing-dots">
                                <span></span><span></span><span></span>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="input-area">
                {pendingImage && (
                    <div className="image-preview-container">
                        <img src={pendingImage} alt="Pending" className="pending-preview" />
                        <button className="remove-image" onClick={() => setPendingImage(null)}>
                            <X size={14} />
                        </button>
                        <span className="preview-label">Image attached - type instructions below</span>
                    </div>
                )}

                <form onSubmit={sendMessage} className="chat-input-form">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onPaste={handlePaste}
                        placeholder={pendingImage ? "Type instructions for this image..." : "Ask a question or paste screenshot..."}
                        className="chat-input"
                    />
                    <button type="submit" className="send-btn">
                        <Send size={18} />
                    </button>
                </form>
            </div>
        </div>
    );
};
