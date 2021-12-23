const Sequelize = require('sequelize')

const dbSequelize = new Sequelize('belajar-sequelize', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
})

module.exports = dbSequelize