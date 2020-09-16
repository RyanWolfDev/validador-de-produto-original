const jwt = require('jsonwebtoken');
const Cliente = require('../models/_index').Ciente;

module.exports = async (req, res, next) => {

    try {
        const token = await req.headers.authorization.split(" ")[1];
        const decodedToken = await jwt.verify(token, 'SECRET_KEY_FOR_CLIENTE');

        console.log(decodedToken)
        req.userData = {
            email: decodedToken.email,
            id: decodedToken.id
        };

        next();

    } catch (err) {
        res.status(401).json({ message: "Você não está autenticado!" })
    };
}