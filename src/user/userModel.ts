import * as Sequelize from 'sequelize'
const db = require('../../config/db')

const userModel = db.define('users', {
    'id': {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    'email': Sequelize.STRING,
    'password': Sequelize.STRING,
    'createdAt': {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },    
    'updatedAt': {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
}, {
    reezeTableName: true
})

module.exports = userModel
