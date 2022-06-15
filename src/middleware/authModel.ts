import db from '../../config/db/index'
import Sequelize from 'sequelize'

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

export default authModel
