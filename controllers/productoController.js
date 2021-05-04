const Productos = require("../models/Productos");

//agrega un nuevo producto
exports.nuevoProducto = async (req, res, next) => {
    // console.log(req.body);
    const producto = new Productos(req.body);

    try {
        //almacenar el registro
        await producto.save();
        res.json({ mensaje: "Se agrego un nuevo producto" });
    } catch (error) {
        //si hay error, log al error y next
        console.log(error);
        next();
    }
}

//muestra todos los productos
exports.mostrarProductos = async (req, res, next) => {
    try {
        const productos = await Productos.find({});
        res.json(productos);
    } catch (error) {
        console.log(error);
        next();
    }    
}

//mostrar un producto por su id
exports.mostrarProducto = async (req, res, next) => {
    try {
        const producto = await Productos.findById(req.params.idProducto);
        res.json(producto);
    } catch (error) {
        res.json({
            mensaje: "Ese producto no existe"
        });
        next();
    }
}

//actualizar un producto por su id
exports.actualizarProducto = async (req, res, next) => {
    try {
        const producto = await Productos.findOneAndUpdate(
            {
                _id: req.params.idProducto
            }, 
            req.body,
            {
                new: true
            }
        );
        res.json(producto);
    } catch (error) {
        res.json({
            mensaje: "Ese producto no existe"
        });
        next();
    }
}

//eliminar un producto por su id
exports.eliminarProducto = async (req, res, next) => {
    try {
        await Productos.findOneAndDelete({ _id: req.params.idProducto });
        res.json({ mensaje: "El producto se ha eliminado" });
    } catch (error) {
        console.log(error);
        res.json({
            mensaje: "Ese producto no existe"
        });
        next();
    }
}