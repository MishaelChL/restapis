const express = require("express");
const routes = require("./routes")
const mongoose = require("mongoose");

//conectar mongo
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/restapi", {
    useNewUrlParser: true
});

//crear el servidor
const app = express();

//rutas de la app
app.use("/", routes());

//puerto
app.listen(3000);