import React,{useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import '../styles/Header.css'
import { AuthContext } from "./AuthContext";
import { useContext } from "react";


export default function Header() {
  const { getStudentFromLocalStorage, getEmployerFromLocalStorage } = useContext(AuthContext);

  const [isStudentLoggedIn, setIsStudentLoggedIn] = useState(null);
  const [isEmployerLoggedIn, setIsEmployerLoggedIn] = useState(null);

  useEffect( () => {
    setIsStudentLoggedIn(getStudentFromLocalStorage);
    setIsEmployerLoggedIn(getEmployerFromLocalStorage);
    console.log(isStudentLoggedIn);
    console.log(isEmployerLoggedIn);
  }, [])


  return (
    <nav>
      <h1>
        BullzShake
      </h1>
      <ul>
        <li><Link to="/">Home</Link></li>
        {isStudentLoggedIn && (<li><Link to="/students">Students</Link></li>)}
        {(<li><Link to="/jobs">Jobs</Link></li>)}
        {isEmployerLoggedIn && (<li><Link to="/employers">Employers</Link></li>)}
        {(isStudentLoggedIn || isEmployerLoggedIn) && (<li><Link to="/">Sign out</Link></li>)}
      </ul>
    </nav>
  )
}
