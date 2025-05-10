import React, { useState, useEffect } from 'react';
import './Chatbot.css';

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode-bg');
    } else {
      document.body.classList.remove('dark-mode-bg');
    }
    return () => document.body.classList.remove('dark-mode-bg');
  }, [darkMode]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    
    const userMsg = { sender: 'user', text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput('');
    setLoading(true);

    try {
      console.log('=== SENDING REQUEST ===');
      console.log('Question:', userMsg.text);
      
      const aiRes = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ question: userMsg.text })
      });

      if (!aiRes.ok) {
        throw new Error(`Server error: ${aiRes.status}`);
      }

      const aiData = await aiRes.json();
      console.log('Response:', aiData);

      if (!aiData.answer) {
        throw new Error('No answer received from server');
      }

      setMessages((msgs) => [...msgs, { sender: 'bot', text: aiData.answer }]);
    } catch (err) {
      console.error('Error:', err);
      setMessages((msgs) => [...msgs, { 
        sender: 'bot', 
        text: `Error: ${err.message || 'Please try again.'}` 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`chatbot-wrapper${darkMode ? ' dark-mode' : ''}`}>
      <aside className="chatbot-sidebar">
        <h2>Main</h2>
        <div className="chatbot-mode-section">
          <label htmlFor="mode-select">Mode</label>
          <input id="mode-select" value="Standard Version GPT 3.5" readOnly className="chatbot-mode-input" />
          <div className="chatbot-checkbox-group">
            <label><input type="checkbox" checked readOnly /> Show resource-link</label>
            <label><input type="checkbox" checked readOnly /> Show proposed prompt</label>
            <label><input type="checkbox" checked={darkMode} onChange={() => setDarkMode(dm => !dm)} /> Dark mode</label>
          </div>
        </div>
        <div className="chatbot-sidebar-footer">
          <button className="chatbot-history-btn">History</button>
          <button className="chatbot-main-btn">Main</button>
        </div>
      </aside>
      <section className="chatbot-main-area">
        <div className="chatbot-plan-banner">
          <span className="chatbot-plan-icon">🟦</span>
          <span>Standard plan <span className="chatbot-plan-active">• Active 300 people</span></span>
          <span className="chatbot-plan-upgrade">Upgrade Plan</span>
          <span className="chatbot-plan-help">Help</span>
          <span className="chatbot-plan-api">API</span>
          <span className="chatbot-user-avatar">MD</span>
        </div>
        <div className="chatbot-chat-area">
          <h1>Geography Chat</h1>
          <div className="chatbot-chat-subtitle">Standard version</div>
          {/* Chat history */}
          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chatbot-message chatbot-message-${msg.sender}`}>
                <span>{msg.sender === 'user' ? '🧑' : '🤖'} </span>{msg.text}
              </div>
            ))}
            {loading && (
              <div className="chatbot-message chatbot-message-bot"><span>🤖 </span>Thinking...</div>
            )}
          </div>
          <div className="chatbot-chat-cards">
            <div className="chatbot-chat-card">
              <h3>Examples</h3>
              <ul>
                <li><a href="#" onClick={e => {e.preventDefault(); setInput('Explain the mountain infrastructure of Macedonia:');}}>Explain the mountain infrastructure of Macedonia:</a></li>
                <li><a href="#" onClick={e => {e.preventDefault(); setInput('What is the capital of Macedonia?');}}>What is the capital of Macedonia?</a></li>
                <li><a href="#" onClick={e => {e.preventDefault(); setInput('How long is the river Treska?');}}>How long is the river Treska?</a></li>
              </ul>
            </div>
            <div className="chatbot-chat-card">
              <h3>Capabilities</h3>
              <ul>
                <li>Remembers what user said earlier in the conversation</li>
                <li>Allows user to provide follow-up corrections</li>
                <li>Trained to decline inappropriate requests</li>
              </ul>
            </div>
            <div className="chatbot-chat-card">
              <h3>Limitations</h3>
              <ul>
                <li>May occasionally generate incorrect information</li>
                <li>May occasionally produce harmful instructions or biased</li>
                <li>Limited knowledge of geography facts</li>
              </ul>
            </div>
          </div>
          <form className="chatbot-chat-input-form" onSubmit={handleSend}>
            <input
              type="text"
              placeholder="Send a message"
              className="chatbot-chat-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              disabled={loading}
            />
            <button type="submit" className="chatbot-chat-send-btn" disabled={loading}>➤</button>
            <button type="button" className="chatbot-chat-new-dialog" onClick={() => setMessages([])} disabled={loading}>New dialog</button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Chatbot; 