//import { createContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";


export const AuthProvider = ({ children }) => {

  const loginStudent = async (userData) => {
    const response = await axios.post("/student/login", userData);

    if (response.data) {
      localStorage.setItem('student', JSON.stringify(response.data));
    }
    return response.data
  }

  const registerStudent = async (userData) => {
    const response = await axios.post("/student/register", userData);

    if (response.data) {
      localStorage.setItem('student', JSON.stringify(response.data));
    }
    return response.data    
  }

  const logoutStudent = () => localStorage.removeItem('student');



  const loginEmployer = async (userData) => {
    const response = await axios.post("/employer/login", userData);

    if (response.data) {
      localStorage.setItem('employer', JSON.stringify(response.data));
    }
    return response.data
  }

  const registerEmployer = async (userData) => {
    const response = await axios.post("/employer/register", userData);

    if (response.data) {
      localStorage.setItem('employer', JSON.stringify(response.data));
    }
    return response.data    
  }

  const logoutEmployer = () => localStorage.removeItem('employer');

  const getStudentFromLocalStorage = () => {
    const student = localStorage.getItem('student');
    if (student) {
      return JSON.parse(student);
    } else {
      return null;
    }
  }

  const getEmployerFromLocalStorage = () => {
    const employer = localStorage.getItem('employer');
    if (employer) {
      return JSON.parse(employer);
    } else {
      return null;
    }
  }


  return (
    <AuthContext.Provider value={{ loginStudent, loginEmployer, registerStudent, registerEmployer, logoutEmployer, logoutStudent, getEmployerFromLocalStorage, getStudentFromLocalStorage }}>
      {children}
    </AuthContext.Provider>
  );
};