const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');  // Usar bcrypt para verificar las contraseñas
const User = require('../models/User');  // Asegúrate de que tienes el modelo de usuario

// Ruta para mostrar el formulario de login
router.get('/login', (req, res) => {
    res.render('login', { message: null });  // Renderiza la vista con mensaje opcional
});

// Ruta para procesar el login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Faltan campos requeridos');
    }

    try {
        // Buscar el usuario en la base de datos
        const user = await User.getByUsername(username);

        if (!user) {
            return res.status(400).send('Usuario no encontrado');
        }

        // Verificar la contraseña
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).send('Contraseña incorrecta');
        }

        // Si las credenciales son correctas, guardar la sesión
        req.session.userId = user.id;  // Guardar el ID del usuario en la sesión
        req.session.username = user.username;

        res.redirect('/dashboard');  // Redirigir a un dashboard o página principal
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).send('Error interno del servidor');
    }
});

module.exports = router;
