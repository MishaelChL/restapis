const Productos = require("../models/Productos");


// multer - shortid
const multer = require('multer');
const shortid = require('shortid');
 
 
const configuracionMulter = {
    storage : fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname+'../../uploads/');
        },
        filename: (req, file, cb) => {
          const extension = file.mimetype.split('/')[1];
          cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req, file, cb){
        if (file.mimetype === 'image/jpeg' || file.mimetype ==='image/png'){
            cb(null,true);
        }else{
            cb(new Error('Formato no valido'));
        }
    },
}
 
// Pasar la configuracion y el campo
const upload = multer (configuracionMulter).single('imagen');
 
//Sube un archivo
exports.subirArchivo = (req, res, next) =>{
    upload(req, res, function(error){
        if(error){
            res.json({mensaje: error});
        }
        return next();
    })
}

//agrega un nuevo producto
exports.nuevoProducto = async (req, res, next) => {
    // console.log(req.body);
    const producto = new Productos(req.body);

    try {
        if(req.file.filename){
            producto.imagen = req.file.filename;
        }

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