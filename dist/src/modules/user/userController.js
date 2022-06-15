"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = __importDefault(require("./userModel"));
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authModel_1 = __importDefault(require("../../middleware/authModel"));
class UserController {
}
_a = UserController;
UserController.newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = {
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 10),
            FullName: req.body.fullName,
            address: req.body.address,
            createdAt: new Date(Date.now())
        };
        const insertData = yield userModel_1.default.create(data);
        res.status(200).json({ message: 'User Added!', insertData });
    }
    catch (err) {
        res.status(500).json({ message: 'Error!', err });
    }
});
UserController.login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        let result;
        let userData = yield userModel_1.default.findAll({
            attributes: ['id', 'username', 'password', 'FullName', 'address'],
            where: { username }
        });
        if (userData.length == 0) {
            res.status(404).json({ message: `Data not found!` });
        }
        else {
            result = userData[0];
            // compare password
            let pass = bcrypt.compareSync(password, result.get().password);
            if (!pass) {
                res.status(400).json({ message: `Wrong username or password!` });
            }
            // sign jwt
            let token = jwt.sign({ id: result.get().id }, 'secret_key', { expiresIn: '5h' });
            const tokenData = {
                userId: result.get().id,
                jwtToken: token,
                createdAt: new Date(Date.now())
            };
            // insert data token
            yield authModel_1.default.create(tokenData);
            res.status(200).json({
                message: 'User Logedin!',
                username: result.get().username,
                fullName: result.get().FullName,
                address: result.get().address,
                jwt: tokenData.jwtToken
            });
        }
    }
    catch (err) {
        res.status(500).json({ message: 'Error!', err });
    }
});
UserController.logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const authData = yield authModel_1.default.destroy({ where: { userId } });
        res.status(201).json({ message: `User logedout!`, authData });
    }
    catch (err) {
        res.status(500).json({ message: 'Error!', err });
    }
});
UserController.userProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        let userData = yield userModel_1.default.findAll({
            attributes: ['username', 'FullName', 'address'],
            where: { id: userId }
        });
        res.status(200).json({ message: "Data Retrived!", userData });
    }
    catch (err) {
        res.status(500).json({ message: 'Error!', err });
    }
});
UserController.editProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        let data = {
            username: req.body.username ? req.body.username : "",
            FullName: req.body.FullName ? req.body.FullName : "",
            address: req.body.address ? req.body.address : ""
        };
        const userData = yield userModel_1.default.findAll({ where: { id: userId } });
        if (userData.length == 0) {
            res.status(404).json({ message: `No data found!` });
        }
        else {
            let userObj = userData[0].get();
            const updateData = yield userModel_1.default.update({
                username: data.username ? data.username : userObj.username,
                password: userObj.password,
                FullName: data.FullName ? data.FullName : userObj.FullName,
                address: data.address ? data.address : userObj.address,
                updatedAt: new Date(Date.now())
            }, { where: { id: userId } });
            res.status(200).json({ message: `Update data success!`, updateData });
        }
    }
    catch (err) {
        res.status(500).json({ message: 'Error!', err });
    }
});
exports.default = UserController;
