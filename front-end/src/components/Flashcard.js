import React, { useState } from 'react';
import './Flashcard.css';

function Flashcard({ fact, image }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className={`flashcard${flipped ? ' flipped' : ''}`} onClick={() => setFlipped(f => !f)}>
      <div className="flashcard-inner">
        <div className="flashcard-front">
          <div className="flashcard-fact">{fact}</div>
        </div>
        <div className="flashcard-back">
          <img src={image} alt="Fact visual" className="flashcard-image" />
        </div>
      </div>
    </div>
  );
}

export default Flashcard; 