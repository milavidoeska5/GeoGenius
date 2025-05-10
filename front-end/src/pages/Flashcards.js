import React, { useState } from 'react';
import Flashcard from '../components/Flashcard';
import './Flashcards.css';

const cards = [
  {
    fact: "What's the tallest mountain in the world?",
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
  },
  {
    fact: "Which river is the longest in the world?",
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
  },
  {
    fact: "What is the largest desert on Earth?",
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80',
  },
  {
    fact: "Which country has the most islands?",
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
  },
];

function Flashcards() {
  const [index, setIndex] = useState(0);

  const goNext = () => setIndex(i => (i + 1) % cards.length);
  const goPrev = () => setIndex(i => (i - 1 + cards.length) % cards.length);
  const skip = () => setIndex(cards.length - 1);

  return (
    <div className="flashcards-page">
      <h1 className="flashcards-title">Flashcards</h1>
      <div className="flashcards-center">
        <Flashcard fact={cards[index].fact} image={cards[index].image} />
      </div>
      <div className="flashcards-controls">
        <button className="flashcards-btn" onClick={goPrev} disabled={index === 0}>◀ Previous</button>
        <button className="flashcards-btn flashcards-btn-next" onClick={goNext} disabled={index === cards.length - 1}>Next ▶</button>
        <button className="flashcards-btn flashcards-btn-skip" onClick={skip} disabled={index === cards.length - 1}>Skip ➤</button>
      </div>
    </div>
  );
}

export default Flashcards; 