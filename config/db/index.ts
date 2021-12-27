const Sequelize = require('sequelize')

const database = 'belajar-sequelize'
const username = 'root'
const password = ''

const sequelize = new Sequelize(database, username, password, {
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