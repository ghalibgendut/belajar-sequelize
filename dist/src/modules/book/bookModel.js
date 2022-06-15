"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../../../config/db"));
const sequelize_1 = __importDefault(require("sequelize"));
const bookModel = db_1.default.define('book', {
    'id': {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    'isbn': sequelize_1.default.STRING,
    'name': sequelize_1.default.STRING,
    'year': sequelize_1.default.STRING,
    'author': sequelize_1.default.STRING,
    'description': sequelize_1.default.TEXT,
    'price': sequelize_1.default.INTEGER,
    'image': {
        type: sequelize_1.default.STRING,
        //Set custom getter for book image using URL
        // get(){
        //     const image = this.getDataValue('image');
        //     return "/img/"+image;
        // }
    },
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
exports.default = bookModel;
