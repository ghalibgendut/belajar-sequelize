const db = require('../../../config/db')
const Sequelize = require('sequelize')

const userModel = db.define('user',{
    'id': {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    'username': Sequelize.STRING,
    'password': Sequelize.STRING,
    'FullName': Sequelize.STRING,
    'address': Sequelize.STRING,
    'createdAt': {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },    
    'updatedAt': {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
}, {
    //prevent sequelize transform table name into plural
    freezeTableName: true,
})

module.exports = userModel