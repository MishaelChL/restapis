const express = require("express");
const router = express.Router();
const clienteController = require("../controllers/clienteController");
const productoController = require("../controllers/productoController");

module.exports = function() {
    //agrega nuevos clientes via POST
    router.post("/clientes", clienteController.nuevoCliente);

    //obtener todos los clientes
    router.get("/clientes", clienteController.mostrarClientes);

    //mostrar un cliente en especifico por id
    router.get("/clientes/:idCliente", clienteController.mostrarCliente);

    //actualizar un cliente
    router.put("/clientes/:idCliente", clienteController.actualizarCliente);

    //eliminar un cliente
    router.delete("/clientes/:idCliente", clienteController.eliminarCliente);


    //agrega nuevos productos via POST
    router.post("/productos", productoController.nuevoProducto);

    //obtener todos los productos
    router.get("/productos", productoController.mostrarProductos);

    //mostrar un producto en especifico por id
    router.get("/productos/:idProducto", productoController.mostrarProducto);

    //actualizar un producto
    router.put("/productos/:idProducto", productoController.actualizarProducto);

    //eliminar un producto
    router.delete("/productos/:idProducto", productoController.eliminarProducto);

    return router;
}