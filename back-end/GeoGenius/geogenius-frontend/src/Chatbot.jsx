import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css';
import CustomNavbar from './CustomNavbar';

const ChatBot = () => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [activeChat, setActiveChat] = useState(null);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSendMessage = async () => {
        if (inputValue.trim() === '') return;

        const userMessage = {
            text: inputValue,
            isUser: true,
            timestamp: new Date()
        };
        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        setInputValue('');

        try {
            const response = await fetch('http://127.0.0.1:5000/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question: inputValue }),
            });
            console.log("Sending:", inputValue);
            const data = await response.json();
            console.log("Received:", data);
            const botMessage = {
                text: data.answer,
                isUser: false,
                timestamp: new Date()
            };

            const finalMessages = [...updatedMessages, botMessage];
            setMessages(finalMessages);

            if (activeChat !== null) {
                setChatHistory(prev =>
                    prev.map(chat =>
                        chat.id === activeChat
                            ? { ...chat, messages: finalMessages }
                            : chat
                    )
                );
            }
        } catch (error) {
            console.error("Fetch error:", error);
            alert("Failed to reach backend: " + error.message);

            const errorMessage = {
                text: 'Bot: Sorry, something went wrong while getting a response.',
                isUser: false,
                timestamp: new Date()
            };
            setMessages([...updatedMessages, errorMessage]);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    const startNewChat = () => {
        const newChatId = chatHistory.length > 0 ? Math.max(...chatHistory.map(c => c.id)) + 1 : 1;
        const newChat = {
            id: newChatId,
            title: `New Chat ${newChatId}`,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            messages: []
        };

        setChatHistory([...chatHistory, newChat]);
        setMessages([]);
        setActiveChat(newChatId);
    };

    const selectChat = (chatId) => {
        const selectedChat = chatHistory.find(chat => chat.id === chatId);
        if (selectedChat) {
            setMessages(selectedChat.messages);
            setActiveChat(chatId);
        }
    };

    return (
        <div className="chat-page">

            <div className="chat-interface">
                <div className="chat-sidebar">
                    <div className="new-chat-button" onClick={startNewChat}>
                        <button>+ New Chat</button>
                    </div>

                    <div className="chat-history">
                        <h3>Chat History</h3>
                        <ul>
                            {chatHistory.map(chat => (
                                <li
                                    key={chat.id}
                                    className={activeChat === chat.id ? 'active' : ''}
                                    onClick={() => selectChat(chat.id)}
                                >
                                    <div className="chat-title">{chat.title}</div>
                                    <div className="chat-date">{chat.date}</div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="chatbot-container">
                    <div className="chatbot-header">
                        <h2>AI Tutor Chat</h2>
                    </div>

                    <div className="chatbot-messages">
                        {messages.length === 0 ? (
                            <div className="empty-chat">
                                <p>Ask me anything about your studies!</p>
                            </div>
                        ) : (
                            messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`message ${message.isUser ? 'user-message' : 'bot-message'}`}
                                >
                                    <div className="message-bubble">{message.text}</div>
                                    <div className="message-time">
                                        {message.timestamp.toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </div>
                                </div>
                            ))
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="chatbot-input-container">
                        <div className="chatbot-input">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={handleInputChange}
                                onKeyPress={handleKeyPress}
                                placeholder="Type your message here..."
                            />
                            <button
                                onClick={handleSendMessage}
                                disabled={inputValue.trim() === ''}
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatBot;