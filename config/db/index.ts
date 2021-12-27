const Sequelize = require('sequelize')

const db = 'belajar-sequelize'
const username = 'root'
const password = ''

const sequelize = new Sequelize(db, username, password, {
    dialect: 'mysql',
    port: 3306,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
})

sequelize.authenticate()

module.exports = sequelize