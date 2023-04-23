import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import '../styles/Home.css'

export default function Home() {
  const navigate = useNavigate();
  const handleGetStarted = () => {
    navigate('/signup');
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="home">
          <h1>Welcome to BullzShake</h1>
          <button className="btn" onClick={handleGetStarted}>
            Get Started
          </button>
        </div>
      </div>
    </>
    
  );
}
