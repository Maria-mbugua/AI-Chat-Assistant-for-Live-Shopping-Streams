import React, { useEffect, useRef, useState } from 'react';
import { Send, User, Sparkles, Bot } from 'lucide-react';
import './Chat.css';

interface Message {
    id: string;
    text: string;
    sender: 'me' | 'server' | 'user' | 'ai';
    username?: string;
    timestamp: number;
}

const RANDOM_USERS = ['Sarah_J', 'Mike88', 'FashionLvr', 'CoolCat', 'JerseyFan'];
const RANDOM_QUESTIONS = [
    "What size is that?",
    "Does this ship to Canada?",
    "Is this still available?",
    "Can you show the back?",
    "What's the material?",
    "How does it fit?",
    "Is it machine washable?"
];

export const Chat: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const ws = useRef<WebSocket | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // AI Logic
    const processAIResponse = (text: string) => {
        const lowerText = text.toLowerCase();
        let reply = '';

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
        } else if (lowerText.includes('discount') || lowerText.includes('promo') || lowerText.includes('code')) {
            reply = "Use code LIVE10 for an extra 10% off right now! 🎟️";
        } else if (lowerText.includes('return') || lowerText.includes('refund')) {
            reply = "We have a 30-day easy return policy. Shop with confidence! ✅";
        }

        if (reply) {
            setMessages(prev => [...prev, {
                id: Date.now().toString() + Math.random(),
                text: reply,
                sender: 'ai',
                username: 'ChatAssist AI',
                timestamp: Date.now()
            }]);
        }
    };

    // Simulate random user messages
    useEffect(() => {
        const interval = setInterval(() => {
            if (Math.random() > 0.7) { // 30% chance to send a message every 3s
                const randomMsg = RANDOM_QUESTIONS[Math.floor(Math.random() * RANDOM_QUESTIONS.length)];
                const randomUser = RANDOM_USERS[Math.floor(Math.random() * RANDOM_USERS.length)];

                setMessages(prev => [...prev, {
                    id: Date.now().toString() + Math.random(),
                    text: randomMsg,
                    sender: 'user',
                    username: randomUser,
                    timestamp: Date.now()
                }]);

                // Trigger AI to respond to this random message
                processAIResponse(randomMsg);
            }
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const [isTyping, setIsTyping] = useState(false);

    // ... existing processAIResponse for simulated users ...

    useEffect(() => {
        ws.current = new WebSocket('ws://localhost:3001');

        ws.current.onopen = () => {
            console.log('Connected to chat server');
            setMessages(prev => [...prev, {
                id: 'system-1',
                text: 'ChatAssist AI is active. Ask about size, shipping, or material!',
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
            } catch (e) {
                console.error('Error parsing message:', e);
            }
        };

        return () => {
            ws.current?.close();
        };
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    const sendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(input);
        }

        // Optimistically add message
        setMessages(prev => [...prev, {
            id: Date.now().toString(),
            text: input,
            sender: 'me',
            username: 'You',
            timestamp: Date.now()
        }]);

        // Show typing indicator and trigger AI response
        setIsTyping(true);
        setTimeout(() => {
            processAIResponse(input);
            setIsTyping(false);
        }, 1000 + Math.random() * 1000);

        setInput('');
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
                            <p>{msg.text}</p>
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

            <form onSubmit={sendMessage} className="chat-input-form">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask a question..."
                    className="chat-input"
                />
                <button type="submit" className="send-btn">
                    <Send size={18} />
                </button>
            </form>
        </div>
    );
};
