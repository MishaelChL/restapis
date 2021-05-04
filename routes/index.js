const express = require("express");
const router = express.Router();
const clienteController = require("../controllers/clienteController");

module.exports = function() {
    //agrega nuevos clientes via POST
    router.post("/clientes", clienteController.nuevoCliente);

    //obtener todos los clientes
    router.get("/clientes", clienteController.mostrarClientes);
    return router;
}