const express = require("express");
const routes = require("./routes")
const mongoose = require("mongoose");

//conectar mongo
mongoose.Promise = global.Promise;
const url = "mongodb://localhost:27017/restapi";
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

const db = mongoose.connection;
db.once('open', _ => {
  console.log('Database connected:', url)
});

db.on('error', err => {
  console.error('connection error:', err)
});

//crear el servidor
const app = express();

//habilitar bodyparser, bodyparser ya viene dentro de express
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//rutas de la app
app.use("/", routes());

//puerto
app.listen(3000);