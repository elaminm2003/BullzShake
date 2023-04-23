const express = require('express');
const {
  createJob,
  getJobs,
  getEmployerJobs,
  getJob,
  updateJob,
  deleteJob,
} = require('../controllers/jobController');

const { protectEmployer } = require('../middleware/authEmployerMiddleware');

const router = express.Router();

router.post('/', protectEmployer, createJob);
router.get('/', getJobs);
router.get('/employer/:id', protectEmployer, getEmployerJobs);
router.get('/:id', getJob);
router.post('/:id', protectEmployer, updateJob);
router.delete('/:id', protectEmployer, deleteJob);

module.exports = router;
