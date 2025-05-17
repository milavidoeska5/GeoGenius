import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import './Style.css';

const QuizStart = () => {
    const [topic, setTopic] = useState('');
    const navigate = useNavigate();

    const handleSubmit = () => {
        if (topic.trim()) {
            navigate(`/quiz/${encodeURIComponent(topic.trim())}`);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', background:'#fdf6e3' }}>
            <Card style={{ width: '100%', maxWidth: '500px', padding: '2rem', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>
                <Card.Body>
                    <Card.Title className="mb-4 text-center">🎓 Start a New Quiz</Card.Title>
                    <Form>
                        <Form.Group controlId="quizTopic">
                            <Form.Label>Test your Macedonian knowledge! Quiz on:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter topic"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                            />
                        </Form.Group>
                        <div className="d-grid gap-2 mt-4">
                            <Button style={{background:'#4f83cc'}} onClick={handleSubmit} className=''>
                                Start Quiz
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default QuizStart;