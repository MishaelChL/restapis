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

//mostrar un cliente por su id
exports.mostrarCliente = async (req, res, next) => {
    try {
        const cliente = await Clientes.findById(req.params.idCliente);
        res.json(cliente);
    } catch (error) {
        res.json({
            mensaje: "Ese cliente no existe"
        });
        next();
    }
}

//actualizar un cliente por su id
exports.actualizarCliente = async (req, res, next) => {
    try {
        const cliente = await Clientes.findOneAndUpdate(
            {
                _id: req.params.idCliente
            }, 
            req.body,
            {
                new: true
            }
        );
        res.json(cliente);
    } catch (error) {
        res.json({
            mensaje: "Ese cliente no existe"
        });
        next();
    }
}