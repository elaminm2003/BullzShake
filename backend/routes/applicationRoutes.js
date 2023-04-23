const express = require('express');
const {
  createApplication,
  getApplications,
  getStudentApplications,
  getJobApplications,
  getApplication,
  updateApplication,
  deleteApplication,
} = require('../controllers/applicationController');

const { protectStudent } = require('../middleware/authStudentMiddleware');

const router = express.Router();

router.post('/', protectStudent, createApplication);
router.get('/', getApplications);
router.get('/student/:id', protectStudent, getStudentApplications);
router.get('/job/:id', protectStudent, getJobApplications);
router.get('/student/:studentId/job/:jobId', protectStudent, getApplication);
router.put('/student/:studentId/job/:jobId', protectStudent, updateApplication);
router.delete('/student/:studentId/job/:jobId', protectStudent, deleteApplication);

module.exports = router;
