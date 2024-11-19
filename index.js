const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

// Conexión a la base de datos MySQL
const db = mysql.createConnection({
    host: 'localhost', // o tu host de base de datos
    user: 'root',      // tu usuario de MySQL
    password: '',      // tu contraseña de MySQL
    database: 'orquideas_db'  // Nombre de tu base de datos
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
    } else {
        console.log('Conectado a la base de datos');
    }
});

// Middleware para parsear los datos del cuerpo (formulario)
app.use(bodyParser.urlencoded({ extended: true }));

// Configuración de EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('img'));


// Ruta raíz / debe redirigir a la página de login
app.get('/', (req, res) => {
    res.redirect('/login');
});

// Ruta de inicio de sesión (GET)
app.get('/login', (req, res) => {
    res.render('login', { message: null });
});

// Ruta para procesar el login (POST)
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Buscar el usuario en la base de datos
    const query = 'SELECT * FROM usuarios WHERE nombre = ?';
    db.query(query, [username], (err, results) => {
        if (err) {
            console.error('Error al buscar el usuario:', err);
            return res.status(500).send('Error interno');
        }

        if (results.length === 0) {
            return res.render('login', { message: 'Usuario no encontrado' });
        }

        // Verificar la contraseña con bcrypt
        bcrypt.compare(password, results[0].password, (err, isMatch) => {
            if (err) {
                console.error('Error al comparar la contraseña:', err);
                return res.status(500).send('Error interno');
            }

            if (!isMatch) {
                return res.render('login', { message: 'Contraseña incorrecta' });
            }

            // Si las credenciales son correctas, redirigir al dashboard
            res.redirect('/dashboard');
        });
    });
});

// Ruta de Dashboard (GET)
app.get('/dashboard', (req, res) => {
    // Simulamos datos de productos
    const productos = [
        { idProducto: 1, nombreProducto: 'Producto 1', precio: 100, cantidadEnStock: 50 },
        { idProducto: 2, nombreProducto: 'Producto 2', precio: 150, cantidadEnStock: 30 },
        { idProducto: 3, nombreProducto: 'Producto 3', precio: 200, cantidadEnStock: 20 }
    ];

    // Pasar la variable username y la lista de productos
    res.render('dashboard', { username: 'admin', productos });
});

// Ruta de registro (GET)
app.get('/register', (req, res) => {
    res.render('register', { message: null });
});

// Ruta para procesar el registro (POST)
app.post('/register', (req, res) => {
    const { username, email, password, confirmPassword } = req.body;

    // Validar que las contraseñas coinciden
    if (password !== confirmPassword) {
        return res.render('register', { message: 'Las contraseñas no coinciden' });
    }

    // Cifrar la contraseña con bcrypt
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            console.error('Error al cifrar la contraseña:', err);
            return res.status(500).send('Error interno');
        }

        // Insertar el nuevo usuario en la base de datos
        const query = 'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)';
        db.query(query, [username, email, hashedPassword], (err, result) => {
            if (err) {
                console.error('Error al registrar el usuario:', err);
                return res.status(500).send('Error al registrar el usuario');
            }

            // Redirigir al login después de registrar el usuario
            res.redirect('/login');
        });
    });
});

// Ruta para cerrar sesión (GET)
app.get('/logout', (req, res) => {
    // Aquí podrías destruir la sesión o realizar otras acciones
    res.redirect('/login');
});

// Servir el servidor en el puerto 3000
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
