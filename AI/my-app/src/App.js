import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatBot from './Chatbot'; // ⬅ Your Chatbot component
import QuizStart from './QuizStart';
import QuizPage from './QuizPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChatBot />} /> {/* Default home page */}
        <Route path="/chatbot" element={<ChatBot />} />
        <Route path="/quiz" element={<QuizStart />} />
        <Route path="/quiz/:topic" element={<QuizPage />} />
      </Routes>
    </Router>
  );
}

export default App;
