const User = require('../models/User');
const bcrypt = require('bcrypt');

class AuthController {
    // Método para iniciar sesión
    static async login(req, res) {
        const { username, password } = req.body;

        // Validar que el usuario y la contraseña sean proporcionados
        if (!username || !password) {
            return res.status(400).json({ message: 'Nombre de usuario y contraseña son requeridos' });
        }

        try {
            // Verificar el usuario y la contraseña
            const user = await User.verifyUser(username, password);

            if (user) {
                // Si el usuario y la contraseña son correctos, guardar la sesión
                req.session.userId = user.id;  // Guardar el ID del usuario en la sesión

                res.status(200).json({
                    message: 'Inicio de sesión exitoso',
                    user: {
                        id: user.id,
                        username: user.username,
                        email: user.email
                    }
                });
            } else {
                // Si no se encontró el usuario o la contraseña es incorrecta
                res.status(401).json({ message: 'Credenciales incorrectas' });
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    }

    // Método para cerrar sesión
    static logout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ message: 'No se pudo cerrar sesión' });
            }
            res.status(200).json({ message: 'Sesión cerrada con éxito' });
        });
    }
}

module.exports = AuthController;
