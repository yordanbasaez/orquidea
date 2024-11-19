const db = require('../config/database');
const bcrypt = require('bcrypt');  // Asegúrate de tener bcrypt importado

class User {
    constructor(id, username, password, email) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
    }

    // Obtener todos los usuarios
    static async getAll() {
        const sql = 'SELECT * FROM usuarios';
        return await db.query(sql);
    }

    // Crear un usuario
    static async create({ username, password, email }) {
        const sql = 'INSERT INTO usuarios (username, password, email) VALUES (?, ?, ?)';
        const result = await db.query(sql, [username, password, email]);
        return result.insertId;
    }

    // Verificar si el usuario existe y la contraseña es correcta
    static async verifyUser(username, password) {
        const sql = 'SELECT * FROM usuarios WHERE username = ?';
        const result = await db.query(sql, [username]);
        
        if (result.length === 0) {
            return null;  // No se encontró el usuario
        }

        const user = result[0];
        // Verificar la contraseña usando bcrypt
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (isPasswordValid) {
            return user;  // Devuelve el usuario si la contraseña es válida
        } else {
            return null;  // Si la contraseña no es válida
        }
    }
}

module.exports = User;
