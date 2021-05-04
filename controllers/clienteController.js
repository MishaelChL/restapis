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

//muestra todos los clientes
exports.mostrarClientes = async (req, res, next) => {
    try {
        const clientes = await Clientes.find({});
        res.json(clientes);
    } catch (error) {
        console.log(error);
        next();
    }    
}