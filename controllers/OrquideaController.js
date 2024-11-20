const Orquidea = require('../models/Orquidea');

// Crear orquídea
const crearOrquidea = async (req, res) => {
  const { nombre, descripcion, frecuencia } = req.body;
  try {
    const nuevaOrquidea = await Orquidea.create({ nombre, descripcion, frecuencia });
    res.status(201).json(nuevaOrquidea);
  } catch (error) {
    res.status(500).json({ message: 'Error creando orquídea', error });
  }
};

// Listar orquídeas
const listarOrquideas = async (req, res) => {
  try {
    const orquideas = await Orquidea.findAll();
    res.status(200).json(orquideas);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo orquídeas', error });
  }
};

module.exports = {
  crearOrquidea,
  listarOrquideas,
};
