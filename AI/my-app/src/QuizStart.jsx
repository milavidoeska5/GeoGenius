import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const QuizStart = () => {
  const [topic, setTopic] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (topic.trim()) {
      navigate(`/quiz/${encodeURIComponent(topic.trim())}`);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>What topic should the quiz be on?</h2>
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter topic"
        style={{ width: '300px', padding: '10px' }}
      />
      <button onClick={handleSubmit} style={{ marginLeft: '1rem', padding: '10px 20px' }}>
        Start Quiz
      </button>
    </div>
  );
};

export default QuizStart;
