"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const dbName = process.env.DBNAME;
const dbUserName = process.env.DBUSER;
const dbHost = process.env.DBHOST;
const dbDriver = process.env.DBDRIVER;
const dbPassword = '';
const dbSequelize = new sequelize_1.Sequelize(dbName, dbUserName, dbPassword, {
    host: dbHost,
    dialect: dbDriver,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});
exports.default = dbSequelize;
