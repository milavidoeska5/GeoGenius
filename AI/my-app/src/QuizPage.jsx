import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Button, Form, Alert } from 'react-bootstrap';

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
    fetch('http://127.0.0.1:5000/quiz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("HTTP error: " + res.status);
        return res.json();
      })
      .then((data) => {
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

  if (!quizData) return <p className="text-center mt-4">Loading quiz...</p>;

  return (
    <Container className="py-5 bg-cream">
      <Card className="p-4 shadow">
        <Card.Body>
          <Card.Title className="mb-4 text-center">📝 Quiz on: {topic}</Card.Title>
          <Form>
            {quizData.questions.slice(0, 5).map((q, index) => (
              <Card key={index} className="mb-4  p-3 border-0">
                <strong>{index + 1}. {q.question}</strong>
                {q.options.map((opt, i) => {
                  const letter = String.fromCharCode(65 + i);
                  return (
                    <Form.Check
                      key={i}
                      type="radio"
                      name={`question-${index}`}
                      label={`${letter}) ${opt}`}
                      value={letter}
                      disabled={submitted}
                      onChange={() => handleSelect(index, letter)}
                      className="mt-2"
                    />
                  );
                })}
              </Card>
            ))}
          </Form>

          {!submitted ? (
            <div className="d-flex justify-content-center gap-3 mt-4">
              <Button className="btn-custom" onClick={handleSubmit}>
                Submit Quiz
              </Button>
              <Button className="btn-custom" onClick={downloadQuizAsTxt}>
                Download Quiz (.txt)
              </Button>
            </div>
          ) : (
            <Alert variant="success" className="text-center mt-4">
              🎉 You got <strong>{score}</strong> out of <strong>{quizData.questions.length}</strong> correct!
            </Alert>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default QuizPage;
