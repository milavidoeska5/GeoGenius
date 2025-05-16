import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const QuizPage = () => {
  const { topic } = useParams();
  const [quizData, setQuizData] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const downloadQuizAsTxt = () => {
  if (!quizData) return;

  let content = `Quiz on: ${topic}\n\n`;
  quizData.questions.forEach((q, index) => {
    content += `${index + 1}. ${q.question}\n`;
    q.options.forEach((opt, i) => {
      const letter = String.fromCharCode(65 + i);
      content += `   ${letter}) ${opt}\n`;
    });
    content += `\n`;
  });

  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `quiz_${topic}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

  

  useEffect(() => {
  console.log("📡 Sending POST to backend:", topic);

  fetch('http://127.0.0.1:5000/quiz', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ topic }),
  })
    .then((res) => {
      console.log("✅ Response status:", res.status);
      if (!res.ok) throw new Error("HTTP error: " + res.status);
      return res.json();
    })
    .then((data) => {
      console.log("✅ Quiz data:", data);
      setQuizData(data);
    })
    .catch((err) => {
      console.error("❌ Fetch failed:", err);
      alert("Fetch failed: " + err.message);
    });
}, [topic]);


  const handleSelect = (qIndex, selectedOption) => {
    setAnswers({ ...answers, [qIndex]: selectedOption });
  };

  const handleSubmit = () => {
    let correct = 0;
    quizData.questions.forEach((q, i) => {
      if (answers[i] === q.correct) correct++;
    });
    setScore(correct);
    setSubmitted(true);
  };

  if (!quizData) return <p>Loading quiz...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Quiz on: {topic}</h2>
      <form>
        {quizData.questions.map((q, index) => (
          <div key={index} style={{ marginBottom: '2rem' }}>
            <p><strong>{index + 1}. {q.question}</strong></p>
            {q.options.map((opt, i) => {
              const letter = String.fromCharCode(65 + i); // A, B, C, D
              return (
                <label key={i} style={{ display: 'block', marginBottom: '5px' }}>
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={letter}
                    onChange={() => handleSelect(index, letter)}
                    disabled={submitted}
                  />
                  {letter}) {opt}
                </label>
              );
            })}
          </div>
        ))}
      </form>

      {!submitted ? (
  <div>
    <button onClick={handleSubmit} style={{ padding: '10px 20px' }}>
      Submit Quiz
    </button>
    <button onClick={downloadQuizAsTxt} style={{ padding: '10px 20px', marginLeft: '10px' }}>
      Download Quiz (.txt)
    </button>
    {/* If you also want PDF: */}
    {/* 
    <button onClick={downloadQuizAsPdf} style={{ padding: '10px 20px', marginLeft: '10px' }}>
      Download Quiz (.pdf)
    </button> 
    */}
  </div>
) : (
  <h3>You got {score} out of {quizData.questions.length} correct.</h3>
)}

    </div>
  );
};

export default QuizPage;
