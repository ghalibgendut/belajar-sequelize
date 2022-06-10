const jwt = require('jsonwebtoken')
const authModel = require('./authModel')

const auth = async (req, res, next) => {

    let token = req.header('Authorization');

    let decoded = jwt.verify(token, 'secret_key')

    await authModel.findAll({
        attributes: ['jwtToken'],
        where: {id: decoded.id}
    })

    next()

}

module.exports = auth;