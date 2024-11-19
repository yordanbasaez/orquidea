const express = require('express');
const router = express.Router();
const OrquideaController = require('../controllers/orquideaController');

router.get('/', OrquideaController.getAllOrquideas);
router.post('/add', OrquideaController.addOrquidea);

module.exports = router;
