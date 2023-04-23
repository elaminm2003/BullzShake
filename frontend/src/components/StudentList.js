import React from 'react';

function StudentList() {
  const students = ['Alice', 'Bob', 'Charlie', 'David'];

  return (
    <div>
      <h2>Registered Students:</h2>
      <ul>
        {students.map((student) => (
          <li key={student}>{student}</li>
        ))}
      </ul>
    </div>
  );
}

export default StudentList;