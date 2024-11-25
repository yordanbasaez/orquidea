const User = require('../models/User');

class UserController {
    
    // Obtener todos los usuarios
    static async getUsers(req, res) {
        try {
            const users = await User.getAll();
            res.json(users);
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            res.status(500).send('Error interno del servidor');
        }
    }

    // Crear un nuevo usuario
    static async createUser(req, res) {
        const { username, password, email } = req.body;

        if (!username || !password) {
            return res.status(400).send('Faltan campos requeridos');
        }

        try {
            const userId = await User.create({ username, password, email });
            res.status(201).json({ message: 'Usuario creado exitosamente', userId });
        } catch (error) {
            console.error('Error al crear usuario:', error);
            res.status(500).send('Error interno del servidor');
        }
    }
}



module.exports = UserController;
