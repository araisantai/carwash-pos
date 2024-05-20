// routes/serviceRoutes.js
const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const { protect } = require('../middleware/authMiddleware');

// CRUD routes for services
router.get('/services', protect, serviceController.list);
router.get('/services/new', protect, serviceController.newForm);
router.post('/services', protect, serviceController.create);
router.get('/services/:id/edit', protect, serviceController.editForm);
router.post('/services/:id/edit', protect, serviceController.update);
router.post('/services/:id/delete', protect, serviceController.delete);

module.exports = router;
