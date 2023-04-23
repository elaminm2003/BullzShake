const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const path = require('path');
const PORT = process.env.PORT || 8000;


//const pool = require('./config/db.js');
//const Student = require("./models/studentModel.js");
//Student.create({student_name : 'Fares Ibrahim', student_email : 'fares@usf.edu', student_major : 'Computer Engineering'})


const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes
app.use('/student', require('./routes/studentRoutes'))
app.use('/employer', require('./routes/employerRoutes'))
app.use('/job', require('./routes/jobRoutes'))
app.use('/application', require('./routes/applicationRoutes'))

// Serve Frontend
if (process.env.NODE_ENV === 'production') {
  // Set build folder as static
  app.use(express.static(path.join(__dirname, '../frontend/build')))

} else {
  app.get('/', (_, res) => {
    res.status(200).json({ message: 'Welcome to BullzShake API' })
  })
}

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

