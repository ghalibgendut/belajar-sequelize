"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../../../config/db"));
const sequelize_1 = __importDefault(require("sequelize"));
const cartModel = db_1.default.define('cart', {
    'id': {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    'userId': sequelize_1.default.INTEGER,
    'bookId': sequelize_1.default.INTEGER,
    'bookQty': sequelize_1.default.INTEGER
}, {
    freezeTableName: true
});
exports.default = cartModel;
