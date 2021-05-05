const express = require("express");
const router = express.Router();
const clienteController = require("../controllers/clienteController");
const productoController = require("../controllers/productoController");
const pedidoController = require("../controllers/pedidoController");

module.exports = function() {


    //-----CLIENTES-----
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


    //-----PRODUCTOS-----
    //agrega nuevos productos via POST
    router.post("/productos", 
        productoController.subirArchivo,
        productoController.nuevoProducto
    );

    //obtener todos los productos
    router.get("/productos", productoController.mostrarProductos);

    //mostrar un producto en especifico por id
    router.get("/productos/:idProducto", productoController.mostrarProducto);

    //actualizar un producto
    router.put("/productos/:idProducto", 
        productoController.subirArchivo,
        productoController.actualizarProducto
    );

    //eliminar un producto
    router.delete("/productos/:idProducto", productoController.eliminarProducto);


    //-----PEDIDOS-----
    //crear pedidos
    router.post("/pedidos", pedidoController.nuevoPedido);

    //mostrar todos los pedidos
    router.get("/pedidos", pedidoController.mostrarPedidos)

    return router;
}