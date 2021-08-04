const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    //autorizacion por medio del header
    const authHeader = req.get('Authorization');

    if(!authHeader){
        const error = new Error('No autenticado, no hay JWT');
        error.statusCode = 401;
        throw error;
    }

    //obtener el token y verificarlo
    //example, Authorization: Bearer 9013090122031
    const token = authHeader.split(' ')[1] //aqui estamos tomando el token que viene despues del bearer
    let revisarToken;
    try {
        revisarToken = jwt.verify(token, 'LLAVESECRETA')
    } catch (error) {
        error.statusCode = 500;
        throw error;
    }

    //si es un token valido pero hay un error
    if(!revisarToken){
        const error = new Error('No autenticado');
        error.statusCode = 401;
        throw error;
    }

    next();

}