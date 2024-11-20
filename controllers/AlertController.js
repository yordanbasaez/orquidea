const Alert = require('../models/Alert');

// Controlador para obtener las alertas pendientes
const obtenerAlertas = (req, res) => {
  Alert.obtenerAlertasPendientes((err, alertas) => {
    if (err) {
      return res.status(500).send('Error al obtener las alertas');
    }
    res.render('alertas', { alertas }); // Pasar las alertas a la vista
  });
};

// Controlador para marcar una alerta como leída
const marcarLeida = (req, res) => {
  const { id } = req.params; // ID de la alerta
  Alert.marcarComoLeida(id, (err, result) => {
    if (err) {
      return res.status(500).send('Error al marcar la alerta');
    }
    res.redirect('/alertas'); // Redirigir a la lista de alertas
  });
};

// Controlador para crear una nueva alerta
const crearAlerta = (req, res) => {
  const { id_orquidea, id_sensor, tipo_alerta, mensaje_alerta } = req.body;
  const alertaData = { id_orquidea, id_sensor, tipo_alerta, mensaje_alerta };
  
  Alert.crearAlerta(alertaData, (err, result) => {
    if (err) {
      return res.status(500).send('Error al crear la alerta');
    }
    res.redirect('/alertas'); // Redirigir a la lista de alertas
  });
};

module.exports = {
  obtenerAlertas,
  marcarLeida,
  crearAlerta,
};