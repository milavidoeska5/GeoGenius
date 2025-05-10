import React, { useState } from 'react';
import './Quiz.css';

const initialQuestions = [
  {
    question: 'What is the biggest lake in Macedonia?',
    options: ['Ohrid', 'Vardar', 'Dojran', 'Tikvesko'],
    correct: 0,
  },
  {
    question: 'Which is the longest river in the world?',
    options: ['Amazon', 'Nile', 'Yangtze', 'Mississippi'],
    correct: 1,
  },
  {
    question: 'What is the capital of Australia?',
    options: ['Sydney', 'Melbourne', 'Canberra', 'Perth'],
    correct: 2,
  },
  {
    question: 'Which continent has the most countries?',
    options: ['Asia', 'Africa', 'Europe', 'South America'],
    correct: 1,
  },
];

function Quiz() {
  const [questions, setQuestions] = useState(initialQuestions);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]); // {selected, correct}
  const [showScore, setShowScore] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [newQ, setNewQ] = useState({ question: '', options: ['', '', '', ''], correct: 0 });

  const current = questions[index];
  const isAnswered = answers[index] !== undefined;

  const handleSelect = (i) => {
    if (isAnswered) return;
    setSelected(i);
    setAnswers(ans => {
      const newAns = [...ans];
      newAns[index] = { selected: i, correct: current.correct };
      return newAns;
    });
  };

  const goNext = () => {
    if (index < questions.length - 1) {
      setIndex(i => i + 1);
      setSelected(null);
    } else {
      setShowScore(true);
    }
  };
  const goPrev = () => {
    if (index > 0) {
      setIndex(i => i - 1);
      setSelected(null);
    }
  };
  const skip = () => {
    goNext();
  };

  const score = answers.filter(a => a && a.selected === a.correct).length;

  const handleAddQ = (e) => {
    e.preventDefault();
    if (!newQ.question.trim() || newQ.options.some(opt => !opt.trim())) return;
    setQuestions(qs => [...qs, { ...newQ, correct: Number(newQ.correct) }]);
    setNewQ({ question: '', options: ['', '', '', ''], correct: 0 });
    setShowAdd(false);
  };

  return (
    <div className="quiz-page">
      <div className="quiz-header">
        <h1 className="quiz-title">{current.question}</h1>
        <button className="quiz-add-btn" onClick={() => setShowAdd(true)}>+ Add Question</button>
      </div>
      <div className="quiz-options-row">
        {current.options.map((opt, i) => {
          let className = 'quiz-option';
          if (isAnswered) {
            if (i === current.correct) className += ' quiz-option-correct';
            if (answers[index]?.selected === i && i !== current.correct) className += ' quiz-option-wrong';
          } else if (selected === i) {
            className += ' quiz-option-selected';
          }
          return (
            <div key={i} className={className} onClick={() => handleSelect(i)}>
              <span className="quiz-option-label">{String.fromCharCode(65 + i)}.</span> <span className="quiz-option-text">{opt}</span>
            </div>
          );
        })}
      </div>
      <div className="quiz-controls">
        <button className="quiz-btn" onClick={goPrev} disabled={index === 0}>◀ Previous</button>
        <button className="quiz-btn quiz-btn-next" onClick={goNext}>{index === questions.length - 1 ? 'Finish' : 'Next ▶'}</button>
        <button className="quiz-btn quiz-btn-skip" onClick={skip}>Skip ➤</button>
      </div>
      {showScore && (
        <div className="quiz-score-modal">
          <div className="quiz-score-content">
            <div className="quiz-score-circle">
              <div className="quiz-score-label">Your score</div>
              <div className="quiz-score-value">{score}</div>
            </div>
            <button className="quiz-btn quiz-btn-next" onClick={() => { setShowScore(false); setIndex(0); setAnswers([]); }}>Complete</button>
          </div>
        </div>
      )}
      {showAdd && (
        <div className="quiz-add-modal">
          <form className="quiz-add-form" onSubmit={handleAddQ}>
            <h2>Add New Question</h2>
            <input className="quiz-add-input" type="text" placeholder="Question" value={newQ.question} onChange={e => setNewQ(q => ({ ...q, question: e.target.value }))} />
            {newQ.options.map((opt, i) => (
              <input key={i} className="quiz-add-input" type="text" placeholder={`Option ${String.fromCharCode(65 + i)}`} value={opt} onChange={e => setNewQ(q => { const opts = [...q.options]; opts[i] = e.target.value; return { ...q, options: opts }; })} />
            ))}
            <label>Correct Answer:
              <select className="quiz-add-select" value={newQ.correct} onChange={e => setNewQ(q => ({ ...q, correct: e.target.value }))}>
                {newQ.options.map((_, i) => (
                  <option key={i} value={i}>{String.fromCharCode(65 + i)}</option>
                ))}
              </select>
            </label>
            <div className="quiz-add-actions">
              <button className="quiz-btn quiz-btn-next" type="submit">Add</button>
              <button className="quiz-btn quiz-btn-skip" type="button" onClick={() => setShowAdd(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Quiz; 