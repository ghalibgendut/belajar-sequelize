"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default.Router();
const bookController_1 = __importDefault(require("./bookController"));
app.get('/search-book', bookController_1.default.searchBook);
app.post('/add-book', bookController_1.default.addBook);
app.patch('/book-update/:id', bookController_1.default.updateBookData);
app.delete('/delete-book/:id', bookController_1.default.deleteBook);
exports.default = app;
