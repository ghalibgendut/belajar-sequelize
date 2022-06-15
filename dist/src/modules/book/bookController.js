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
const sequelize_1 = require("sequelize");
const bookModel_1 = __importDefault(require("./bookModel"));
class BookController {
}
_a = BookController;
BookController.addBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = {
            isbn: req.body.isbn,
            name: req.body.name,
            year: req.body.year,
            author: req.body.author,
            description: req.body.description,
            price: req.body.price,
            image: req.body.image
        };
        // check if isbn book already existed
        let bookData = yield bookModel_1.default.findOne({
            attributes: ['isbn'],
            where: { isbn: data.isbn }
        });
        if ((bookData === null || bookData === void 0 ? void 0 : bookData.isNewRecord) == false) {
            res.status(400).json({ message: 'Error! Book ISBN already existed' });
        }
        const insertData = yield bookModel_1.default.create(data);
        res.status(200).json({ message: 'Data Inserted!', insertData });
    }
    catch (err) {
        res.status(500).json({ message: 'Error!', err });
    }
});
BookController.searchBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let keyword = {
            isbn: req.query.keyword,
            name: req.query.keyword
        };
        let bookData;
        if (!keyword.isbn && !keyword.name) {
            bookData = yield bookModel_1.default.findAll();
            res.status(200).json({ message: 'Data Retrived', bookData });
        }
        else {
            bookData = yield bookModel_1.default.findAll({
                where: {
                    [sequelize_1.Op.or]: [{ isbn: keyword.isbn }, { name: { [sequelize_1.Op.like]: `%${keyword.name}%` } }]
                }
            });
            if (bookData.length == 0) {
                res.status(404).json({ message: `Data not found!` });
            }
            else {
                res.status(200).json({ bookData });
            }
        }
    }
    catch (err) {
        res.status(500).json({ message: 'Error!', err });
    }
});
BookController.updateBookData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        let data = {
            isbn: req.body.isbn ? req.body.isbn : "",
            name: req.body.name ? req.body.name : "",
            year: req.body.year ? req.body.year : "",
            author: req.body.author ? req.body.author : "",
            description: req.body.description ? req.body.description : "",
            price: req.body.price ? req.body.price : ""
        };
        // check if data not null
        if (data.isbn == '' && data.name == '' && data.year == '' && data.author == '' && data.description == '' || data.price == '') {
            res.status(400).json({ message: `Data cannot be null!` });
        }
        else {
            // call the data from db
            const bookDb = yield bookModel_1.default.findAll({ where: { id } });
            if (bookDb.length == 0) {
                res.status(404).json({ message: `No data found!` });
            }
            else {
                let bookObj = bookDb[0].get();
                const updateData = yield bookModel_1.default.update({
                    isbn: data.isbn ? data.isbn : bookObj.isbn,
                    name: data.name ? data.name : bookObj.name,
                    year: data.year ? data.year : bookObj.year,
                    author: data.author ? data.author : bookObj.author,
                    description: data.description ? data.description : bookObj.description,
                    price: data.price ? data.price : bookObj.price,
                    updatedAt: new Date(Date.now())
                }, { where: { id } });
                res.status(200).json({ message: `Update data success!`, updateData });
            }
        }
    }
    catch (err) {
        res.status(500).json({ message: 'Error!', err });
    }
});
BookController.deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        // check if book data exist 
        const bookDb = yield bookModel_1.default.findAll({ where: { id } });
        if (bookDb.length == 0) {
            res.status(404).json({ message: `No data found!` });
        }
        else {
            const bookData = yield bookModel_1.default.destroy({ where: { id } });
            res.status(201).json({ message: `Data deleted!`, bookData });
        }
    }
    catch (err) {
        res.status(500).json({ message: 'Error!', err });
    }
});
exports.default = BookController;
