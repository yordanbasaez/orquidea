const express = require('express');
const router = express.Router();
const AlertController = require('../controllers/AlertController');

// Ruta para mostrar las alertas pendientes
router.get('/alertas', AlertController.obtenerAlertas);

// Ruta para marcar una alerta como leída
router.put('/alertas/:id/leer', AlertController.marcarLeida);

// Ruta para crear una nueva alerta (por ejemplo, desde un formulario)
router.post('/alertas', AlertController.crearAlerta);

module.exports = router;