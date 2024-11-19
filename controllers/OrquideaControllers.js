const db = require('../config/database');

class OrquideaController {
    // Método para obtener todas las orquídeas
    static async getAllOrquideas() {
        const sql = 'SELECT * FROM orquideas';
        return await db.query(sql);
    }

    // Método para agregar una orquídea
    static async addOrquidea(nombre, descripcion) {
        const sql = 'INSERT INTO orquideas (nombre, descripcion) VALUES (?, ?)';
        return await db.query(sql, [nombre, descripcion]);
    }
}

module.exports = OrquideaController;
