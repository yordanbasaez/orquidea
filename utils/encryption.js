const bcrypt = require('bcrypt');

// Función para encriptar datos
const encriptar = async (dato) => {
    const saltRounds = 10; // Nivel de seguridad
    try {
        const hash = await bcrypt.hash(dato, saltRounds);
        return hash;
    } catch (error) {
        console.error('Error al encriptar:', error);
        throw error;
    }
};

// Función para verificar datos encriptados
const verificar = async (dato, hash) => {
    try {
        const match = await bcrypt.compare(dato, hash);
        return match; // Retorna true si coinciden, false si no
    } catch (error) {
        console.error('Error al verificar:', error);
        throw error;
    }
};

module.exports = { encriptar, verificar };
