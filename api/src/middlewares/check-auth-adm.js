const jwt = require('jsonwebtoken');
const Adm = require('../models/_index').Adm;

module.exports = async (req, res, next) => {
    try {
        const token = await req.headers.authorization.split(" ")[1];

        const decodedToken = await jwt.verify(token, 'SECRET_KEY_FOR_ADM');

        //Valido se o usuario é realmente um Adm
        isAdm = await Adm.findAll({
            where: {
                id: decodedToken.id,
            }
        });

        isAdm = isAdm[0];

        if (!isAdm) {
            throw { message: "Rota restrita somente para Administradores!" }
        }

        req.userData = {
            login: decodedToken.login,
            id: decodedToken.id
        };

        next();

    } catch (err) {
        res.status(401).json({ message: "Você não está autenticado!" })
    };
}