"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default.Router();
const cartController_1 = __importDefault(require("./cartController"));
const index_1 = __importDefault(require("../../middleware/index"));
app.post('/add-cart', index_1.default, cartController_1.default.addCart);
app.delete('/delete-item-cart', index_1.default, cartController_1.default.deleteCart);
exports.default = app;
