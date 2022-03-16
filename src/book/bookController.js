const { Op } = require("sequelize");
const Sequelize = require('sequelize')
const book = require('./bookModel')

class BookController {

    static getAllData = async (req, res) => {
        try {
            const bookData = await book.findAll()

            res.status(200).json({message: 'Data Retrived', bookData})
            
        } catch (err) {
            res.status(500).json({message: 'Error!', err})
        }
    }

    static addBook = async (req, res) => {
        try {
            const data = {
                isbn: req.body.isbn,
                name: req.body.name,
                year: req.body.year,
                author: req.body.author,
                description: req.body.description,
                image: req.body.image
            }

            const insertData = await book.create(data)

            res.status(200).json({message: 'Data Inserted!', insertData})

        } catch (err) {
            res.status(500).json({message: 'Error!', err})
        }
    } 

    static searchBook = async (req, res) => {
        try {
            let isbn = req.query.isbn
            let name = req.query.name
            let bookData
            
            if (!isbn && !name) {
                bookData = await book.findAll()

                res.status(200).json({message: 'Data Retrived', bookData})
            }
            else{
                bookData = await book.findAll({
                    where: {
                        [Op.or]: [{isbn: isbn}, {name: {[Op.like]: `%${name}%`}}]
                    }
                })
    
                if (!bookData) {
                    res.status(404).json({message:`Data not found!`})
                }
                else{
                    res.status(200).json({bookData})
                }
            }
            
        } catch (err) {
            res.status(500).json({message: 'Error!', err})
        }
    }
}

module.exports = BookController