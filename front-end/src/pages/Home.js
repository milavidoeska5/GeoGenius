import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="home-wrapper">
      <div className="home-main">
        <div className="home-left">
          <h1>Start learning<br />with us now</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa laboriosam  voluptates sed beatae?</p>
          <button className="start-btn">Start learning</button>
        </div>
        <div className="home-center">
          <img src="https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80" alt="Learning Illustration" className="home-illustration" />
          <img src="https://images.pexels.com/photos/4145197/pexels-photo-4145197.jpeg?auto=compress&w=400&h=300&fit=crop" alt="Student" className="home-student" />
        </div>
        <div className="home-right">
          <h2>Welcome to our page</h2>
          <ul>
            <li>Start learning from our flashcards</li>
            <li>Expand your knowledge</li>
            <li>Do your favourite quiz</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home; 