const mysql = require('mysql2');

class Database {
    constructor() {
        this.connection = mysql.createPool({
            host: 'localhost',                  // Cambia si usas otro host
            user: 'root',                       // Usuario por defecto de XAMPP
            password: '',                       // Contrasena (dejala vacia si no tienes una)
            database: 'orquideas_db',           // Nombre de la base de datos
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
    }

                                               // Metodo para ejecutar consultas
    query(sql, params) {
        return new Promise((resolve, reject) => {
            this.connection.execute(sql, params, (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    }

                                                // Cerrar conexiones (opcional para tests)
    close() {
        return new Promise((resolve, reject) => {
            this.connection.end(err => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    }
}

module.exports = new Database();
