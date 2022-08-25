"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const bookRoutes_1 = __importDefault(require("./src/modules/book/bookRoutes"));
const userRoutes_1 = __importDefault(require("./src/modules/user/userRoutes"));
const cartRoutes_1 = __importDefault(require("./src/modules/cart/cartRoutes"));
app.use(express_1.default.json());
app.use(bookRoutes_1.default);
app.use(userRoutes_1.default);
app.use(cartRoutes_1.default);
app.get('/', (req, res) => {
    res.status(200).json(`<h1> API Running at port: ${port}</h1>`);
});
app.listen(port, () => { console.log(`API Running at ${port}`); });
