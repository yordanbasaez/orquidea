const db = require('../config/database');   // Falta implementar el ejs 

const obtenerAlertasPendientes = (callback) => {
  const query = 'SELECT * FROM alertas WHERE leida = "No"'; 
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener alertas:', err);
      callback(err, null);
      return;
    }
    callback(null, results);
  });
};

// Función para marcar una alerta como leída
const marcarComoLeida = (alertaId, callback) => {
  const query = 'UPDATE alertas SET leida = "Si" WHERE id_alerta = ?';
  db.query(query, [alertaId], (err, results) => {
    if (err) {
      console.error('Error al actualizar alerta:', err);
      callback(err, null);
      return;
    }
    callback(null, results);
  });
};

// Función para crear una nueva alerta
const crearAlerta = (alertaData, callback) => {
  const { id_orquidea, id_sensor, tipo_alerta, mensaje_alerta } = alertaData;
  const query = `
    INSERT INTO alertas (id_orquidea, id_sensor, tipo_alerta, mensaje_alerta, leida, creada_en)
    VALUES (?, ?, ?, ?, "No", NOW())
  `;
  db.query(query, [id_orquidea, id_sensor, tipo_alerta, mensaje_alerta], (err, results) => {
    if (err) {
      console.error('Error al crear alerta:', err);
      callback(err, null);
      return;
    }
    callback(null, results);
  });
};

module.exports = {
  obtenerAlertasPendientes,
  marcarComoLeida,
  crearAlerta,
};