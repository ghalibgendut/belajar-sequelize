"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default.Router();
const userController_1 = __importDefault(require("./userController"));
const index_1 = __importDefault(require("../../middleware/index"));
app.post('/new-user', userController_1.default.newUser);
app.post('/login', userController_1.default.login);
app.get('/user-profile/:userId', index_1.default, userController_1.default.userProfile);
app.patch('/edit-profile/:userId', index_1.default, userController_1.default.editProfile);
app.delete('/logout/:userId', userController_1.default.logout);
exports.default = app;
