const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const employer = require('../models/employerModel')


// @desc    Get all employers
// @route   GET /api/employers
// @access  Public
const getEmployers = asyncHandler(async (req, res) => {
  const employers = await Employer.findAll()
  res.status(200).json(employers)
})

// @desc    Get employer by ID
// @route   GET /api/employers/:id
// @access  Public
const getEmployer = asyncHandler(async (req, res) => {
  const employer = await Employer.findById(req.params.id)

  if (!employer) {
    res.status(404)
    throw new Error('Employer not found')
  }

  res.status(200).json(employer)
})


// @desc    Register a new employer
// @route   /api/employers
// @access  Public
const registerEmployer = asyncHandler(async (req, res) => {
  const { employer_name, employer_email, password } = req.body

  // Validation
  if (!employer_name || !employer_email || !password) {
    res.status(400)
    throw new Error('Please include all fields')
  }

  // Find if employer already exists
  const employerExists = await employer.findByEmail(employer_email)

  if (employerExists) {
    res.status(400)
    throw new Error('employer already exists')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create employer
  await employer.create({
    employer_name,
    employer_email,
    password: hashedPassword,
  })

  const employer = employer.findByEmail(employer_email);

  if (employer) {
    res.status(201).json({
      id: employer.employer_id,
      name: employer.employer_name,
      email: employer.employer_email,
      token: generateToken(employer.employer_id)
    })
  } else {
    res.status(400)
    throw new error('Invalid employer data')
  }
})

// @desc    Login a employer
// @route   /api/employer/login
// @access  Public
const loginEmployer = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const employer = await employer.findByEmail(email)

  // Check employer and passwords match
  if (employer && (await bcrypt.compare(password, employer.password))) {
    res.status(200).json({
      id: employer.employer_id,
      name: employer.employer_name,
      email: employer.employer_email,
      token: generateToken(employer.employer_id)
    })
  } else {
    res.status(401)
    throw new Error('Invalid credentials')
  }
})

// @desc    Get current employer
// @route   /api/employer/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  const employer = {
    id: req.employer.id,
    email: req.employer.email,
    name: req.employer.name
  }
  res.status(200).json(employer)
})

// Generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}


// @access Public
const updateEmployer = asyncHandler(async (req, res) => {
  const employer = await Employer.findById(req.params.id);
    
  if (!employer) {
    res.status(404);
    throw new Error('Employer not found');
  }
  
  const updatedEmployer = await Employer.update(req.params.id, req.body);
  
  res.status(200).json(updatedEmployer);
});
    
// @desc Delete employer
// @route DELETE /api/employers/:id
// @access Public
const deleteEmployer = asyncHandler(async (req, res) => {
  const employer = await Employer.findById(req.params.id);
  
  if (!employer) {
    res.status(404);
    throw new Error('Employer not found');
  }
  
  await Employer.delete(req.params.id);
  
  res.status(200).json({ success: true });
});
    
module.exports = {
  getEmployers,
  getEmployer,
  registerEmployer,
  loginEmployer,
  getMe,
  updateEmployer,
  deleteEmployer,
}
