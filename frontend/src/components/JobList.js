import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/JobList.css'
import Header from './Header';
import axios from 'axios';

const jobs = [
  // {
  //   id: 1,
  //   title: 'Web Developer',
  //   company: 'Google',
  //   location: 'Mountain View, CA',
  //   description: 'We are looking for a skilled web developer to join our team',
  // },
  // {
  //   id: 2,
  //   title: 'Software Engineer',
  //   company: 'Facebook',
  //   location: 'Menlo Park, CA',
  //   description: 'We are seeking a talented software engineer to work on our platform',
  // },
  // {
  //   id: 3,
  //   title: 'Data Analyst',
  //   company: 'Microsoft',
  //   location: 'Redmond, WA',
  //   description: 'We are looking for a data analyst to help us make sense of our data',
  // },
  // {
  //   id: 1,
  //   title: 'Web Developer',
  //   company: 'Google',
  //   location: 'Mountain View, CA',
  //   description: 'We are looking for a skilled web developer to join our team',
  // },
  // {
  //   id: 2,
  //   title: 'Software Engineer',
  //   company: 'Facebook',
  //   location: 'Menlo Park, CA',
  //   description: 'We are seeking a talented software engineer to work on our platform',
  // },
  // {
  //   id: 3,
  //   title: 'Data Analyst',
  //   company: 'Microsoft',
  //   location: 'Redmond, WA',
  //   description: 'We are looking for a data analyst to help us make sense of our data',
  // },
  // {
  //   id: 1,
  //   title: 'Web Developer',
  //   company: 'Google',
  //   location: 'Mountain View, CA',
  //   description: 'We are looking for a skilled web developer to join our team',
  // },
  // {
  //   id: 2,
  //   title: 'Software Engineer',
  //   company: 'Facebook',
  //   location: 'Menlo Park, CA',
  //   description: 'We are seeking a talented software engineer to work on our platform',
  // },
  // {
  //   id: 3,
  //   title: 'Data Analyst',
  //   company: 'Microsoft',
  //   location: 'Redmond, WA',
  //   description: 'We are looking for a data analyst to help us make sense of our data',
  // },
];

// function JobList() {




//   return (
//     <div>
//       {jobs.map(job => (
//         <div key={job.id} className="card">
//           <h2>{job.title}</h2>
//           <p>{job.description}</p>
//           <p>{job.company}</p>
//           <p>{job.location}</p>
//         </div>
//       ))}
//     </div>
//   );
// }





const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  const handleApply = (jobId) => {
    navigate(`/apply/${jobId}`);
  };

  useEffect(() => {
    axios.get('/job/') //dont kow what route to put here
      .then(response => response.json())
      .then(data => setJobs(data));
  }, []);


  return (
    <div>
      <Header/>
      <div className='job-listing-title'><h2>Job Postings</h2></div>
      <div className="job-card-container">
  {jobs.map((job) => (
    <div key={job.id} className="job-card">
      <h2>{job.title}</h2>
      <h3>{job.company}</h3>
      <p>{job.location}</p>
      <p>{job.description}</p>
      <button onClick={() => handleApply(job.id)}>Apply</button>
    </div>
  ))}
</div>

  </div>
  );
};


export default JobList;
