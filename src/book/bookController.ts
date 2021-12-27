const book = require('./bookModel')
import { Request, Response } from "express";

class BookController {

    static getAllData = async (req: Request, res: Response) => {
        try {
            const bookData = await book.findAll()

            res.status(201).json({message: 'Data Retrived', bookData})
            
        } catch (err) {
            res.status(500).json({message: 'Error!', err})
        }
    }

    static addBook = async (req: Request, res: Response) => {
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
}

module.exports = BookController