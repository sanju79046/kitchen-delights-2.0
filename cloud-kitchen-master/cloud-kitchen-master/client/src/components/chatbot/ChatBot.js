// src/Chatbot.jsx
import React, { useState } from 'react';
import './ChatBot.css';

// Define keyword mappings
const responses = [
    { keywords: ['hello', 'hi'], reply: 'Hello! How can I assist you today?' },
    { keywords: ['price', 'cost'], reply: 'The cost depends on the product. Can you specify which product you are interested in?' },
    { keywords: ['hours', 'open'], reply: 'We are open from 9 AM to 9 PM every day.' },
    { keywords: ['contact', 'phone'], reply: 'You can reach us at (123) 456-7890.' },
    { keywords: ['help', 'support'], reply: 'Sure, what do you need help with?' },
    // Add more responses here
];

const findResponse = (message) => {
    for (const response of responses) {
        for (const keyword of response.keywords) {
            if (message.toLowerCase().includes(keyword)) {
                return response.reply;
            }
        }
    }
    return "Sorry, I didn't understand that.";
};

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
            const userMessage = { text: input, sender: 'user' };
            const botReply = findResponse(input);
            const botMessage = { text: botReply, sender: 'bot' };
            setMessages([...messages, userMessage, botMessage]);
            setInput('');
        }
    };

    return (
        <div className="chatbot-container">
            <h2 className="chat-header">Chatbot</h2>
            <div className="message-box">
                {messages.map((message, index) => (
                    <div key={index} className={`message message-${message.sender}`}>
                        <p>{message.text}</p>
                    </div>
                ))}
            </div>
            <form className="chat-input-container" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default Chatbot;
