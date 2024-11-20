class Orquidea {
    constructor(id_orquidea, nombre, tipo_orquidea, fecha_ingreso, frecuencia_riego) {
        this.id_orquidea = id_orquidea;
        this.nombre = nombre;
        this.tipo_orquidea = tipo_orquidea;
        this.fecha_ingreso = fecha_ingreso;
        this.frecuencia_riego = frecuencia_riego;
    }

    // Método para guardar una orquídea en la base de datos
    guardar() {
        // Aquí iría la lógica para guardar la instancia de la orquídea en la base de datos
        // Por ejemplo, usando una conexión a la base de datos MongoDB
        // Ejemplo en Mongoose:
        const OrquideaModel = require('./models/Orquidea'); // Supongamos que tenemos un modelo en MongoDB
        return OrquideaModel.create({
            nombre: this.nombre,
            tipo_orquidea: this.tipo_orquidea,
            fecha_ingreso: this.fecha_ingreso,
            frecuencia_riego: this.frecuencia_riego
        });
    }

    // Método para encontrar una orquídea por su ID
    static encontrarPorId(id) {
        const OrquideaModel = require('./models/Orquidea');
        return OrquideaModel.findById(id);
    }

    // Método para actualizar una orquídea
    static actualizar(id, updatedOrquidea) {
        const OrquideaModel = require('./models/Orquidea');
        return OrquideaModel.findByIdAndUpdate(id, updatedOrquidea, { new: true });
    }

    // Método para eliminar una orquídea
    static eliminar(id) {
        const OrquideaModel = require('./models/Orquidea');
        return OrquideaModel.findByIdAndDelete(id);
    }

    // Método para listar todas las orquídeas
    static listarTodos() {
        const OrquideaModel = require('./models/Orquidea');
        return OrquideaModel.find();
    }
}

module.exports = Orquidea;
