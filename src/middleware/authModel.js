const db = require('../../config/db/index')
const Sequelize = require('sequelize')

const authModel = db.define('auth', {
    'id':{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    'userId': Sequelize.INTEGER,
    'jwtToken': Sequelize.STRING
}, {
    //prevent sequelize transform table name into plural
    freezeTableName: true,
})

module.exports = authModel
