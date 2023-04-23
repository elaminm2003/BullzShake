import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Signup.css'
import Header from './Header';
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

const Signup = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const { setIsLoggedIn } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle signup logic here
    if (title === 'student') {
      navigate('/jobs');
    } else if (title === 'employer') {
      navigate('/applications');
    }
    setIsLoggedIn(true);
  }

  const handleLogIn = (e) => {
    e.preventDefault();
    navigate('/login');
  }

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  }

  let fields;
  if (title === 'student') {
    fields = (
      <>
        <label className="signup-page-label">First name:</label>
        <input type="text" value={first_name} onChange={(e) => setFirstName(e.target.value)} className="signup-page-input" required />
        <label className="signup-page-label">Last name:</label>
        <input type="text" value={last_name} onChange={(e) => setLastName(e.target.value)} className="signup-page-input" required />
      </>
    );
  } else if (title === 'Employer') {
    fields = (
      <>
        <label className="signup-page-label">Company Name:</label>
        <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="signup-page-input" required />
      </>
    );
  }

  return (
    <>
    <Header/>
    <div className="signup-page">
      <h2 className="signup-page-title">SIGN UP</h2>
      <div className="user-type">
        <label className="signup-page-label">User type:</label>
        <div className="radio-buttons">
          <input type="radio" name="user-type" onClick={handleTitleChange} value="student" className="radio-input" id="student-radio" />
          <label htmlFor="student-radio" className="radio-label">Student</label>
          <input type="radio" name="user-type" onClick={handleTitleChange} value="Employer" className="radio-input" id="employer-radio" />
          <label htmlFor="employer-radio" className="radio-label">Employer</label>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        {fields}
        <label className="signup-page-label">Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="signup-page-input" required />
        <label className="signup-page-label">Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="signup-page-input" required />
        <button type="submit" className="signup-btn">Sign up</button>
      </form>
      <div className="signup-link">
        Don't have an account? <button onClick={handleLogIn} className="signup-btn">Login</button>
      </div>
    </div>
    </>
    
  );
}

export default Signup;
