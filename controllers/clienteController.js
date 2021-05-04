const Clientes = require("../models/Clientes");

//agrega un nuevo cliente
exports.nuevoCliente = async (req, res, next) => {
    // console.log(req.body);
    const cliente = new Clientes(req.body);

    try {
        //almacenar el registro
        await cliente.save();
        res.json({ mensaje: "Se agrego un nuevo Cliente" });
    } catch (error) {
        //si hay error, log al error y next
        console.log(error);
        next();
    }
}