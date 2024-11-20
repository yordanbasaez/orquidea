// orquideaRoutes.js

const express = require('express');
const router = express.Router();

// Conexión a la base de datos (asegúrate de que la conexión esté correcta)
const db = require('../config/database');  // Cambiado a la ruta correcta

// Ruta POST para agregar una nueva orquídea
router.post('/add', (req, res) => {
    const { nombre, tipo_orquidea, fecha_ingreso, frecuencia_riego } = req.body;

    // Validar que todos los campos sean proporcionados
    if (!nombre || !tipo_orquidea || !fecha_ingreso || !frecuencia_riego) {
        return res.status(400).send('Todos los campos son requeridos');
    }

    // Consulta para insertar la nueva orquídea en la base de datos
    const query = 'INSERT INTO orquideas (nombre, tipo_orquidea, fecha_ingreso, frecuencia_riego) VALUES (?, ?, ?, ?)';
    db.query(query, [nombre, tipo_orquidea, fecha_ingreso, frecuencia_riego], (err, result) => {
        if (err) {
            console.error('Error al agregar la orquídea:', err);
            return res.status(500).send('Error al agregar la orquídea');
        }
        res.status(200).send('Orquídea agregada exitosamente');
    });
});

module.exports = router;
