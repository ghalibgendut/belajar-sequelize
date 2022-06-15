"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../../config/db/index"));
const sequelize_1 = __importDefault(require("sequelize"));
const authModel = index_1.default.define('auth', {
    'id': {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    'userId': sequelize_1.default.INTEGER,
    'jwtToken': sequelize_1.default.STRING
}, {
    //prevent sequelize transform table name into plural
    freezeTableName: true,
});
exports.default = authModel;
