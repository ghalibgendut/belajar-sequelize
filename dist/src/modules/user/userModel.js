"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../../../config/db"));
const sequelize_1 = __importDefault(require("sequelize"));
const userModel = db_1.default.define('user', {
    'id': {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    'username': sequelize_1.default.STRING,
    'password': sequelize_1.default.STRING,
    'FullName': sequelize_1.default.STRING,
    'address': sequelize_1.default.STRING,
    'createdAt': {
        type: sequelize_1.default.DATE,
        defaultValue: sequelize_1.default.NOW
    },
    'updatedAt': {
        type: sequelize_1.default.DATE,
        defaultValue: sequelize_1.default.NOW
    },
}, {
    //prevent sequelize transform table name into plural
    freezeTableName: true,
});
exports.default = userModel;
