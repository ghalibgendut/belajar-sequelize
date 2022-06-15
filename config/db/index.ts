import { Sequelize,  Dialect } from 'sequelize'
import dotenv from "dotenv";
dotenv.config()
const dbName = process.env.DBNAME as string
const dbUserName = process.env.DBUSER as string
const dbHost = process.env.DBHOST
const dbDriver = process.env.DBDRIVER as Dialect
const dbPassword = ''


const dbSequelize = new Sequelize(dbName, dbUserName, dbPassword, {
    host: dbHost,
    dialect: dbDriver,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
})

export default dbSequelize