import { Op } from "sequelize";
import { Request, Response} from 'express'
import book from './bookModel';

class BookController {

    static addBook = async (req: Request, res: Response) => {
        try {
            const data = {
                isbn: req.body.isbn,
                name: req.body.name,
                year: req.body.year,
                author: req.body.author,
                description: req.body.description,
                price: req.body.price,
                image: req.body.image
            }

            // check if isbn book already existed
            let bookData = await book.findOne({
                attributes: ['isbn'],
                where: {isbn: data.isbn}
            })
                
            if (bookData?.isNewRecord == false) {
                res.status(400).json({message: 'Error! Book ISBN already existed'})
            }
            
            const insertData = await book.create(data)

            res.status(200).json({message: 'Data Inserted!', insertData})

        } catch (err) {
            res.status(500).json({message: 'Error!', err})
        }
    } 

    static searchBook = async (req: Request, res: Response) => {
        try {
            let keyword = {
                isbn: req.query.keyword,
                name: req.query.keyword
            }
            
            let bookData
            
            if (!keyword.isbn && !keyword.name) {
                bookData = await book.findAll()

                res.status(200).json({message: 'Data Retrived', bookData})
            }
            else{
                bookData = await book.findAll({
                    where: {
                        [Op.or]: [{isbn: keyword.isbn}, {name: {[Op.like]: `%${keyword.name}%`}}]
                    }
                })
                
    
                if (bookData.length == 0) {
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

    static updateBookData = async (req: Request, res: Response) => {
        try {
            const id = req.params.id
            let data = {
                isbn: req.body.isbn ? req.body.isbn : "",
                name: req.body.name ? req.body.name : "",
                year: req.body.year ? req.body.year : "",
                author: req.body.author ? req.body.author : "",
                description: req.body.description ? req.body.description : "",
                price: req.body.price ? req.body.price : ""
            }

            // check if data not null
            if (data.isbn == '' && data.name == '' && data.year == '' && data.author == '' && data.description == '' || data.price == '') {
                res.status(400).json({message: `Data cannot be null!`})
            }
            else{
                // call the data from db
                const bookDb = await book.findAll({where: {id}})

                if (bookDb.length == 0) {
                    res.status(404).json({message: `No data found!`})
                }
                else {
                    
                    let bookObj = bookDb[0].get()

                    const updateData = await book.update({
                        isbn: data.isbn ? data.isbn : bookObj.isbn,
                        name: data.name ? data.name : bookObj.name,
                        year: data.year ? data.year : bookObj.year,
                        author: data.author ? data.author : bookObj.author,
                        description: data.description ? data.description : bookObj.description,
                        price: data.price ? data.price : bookObj.price,
                        updatedAt: new Date(Date.now())
                    },{where: {id}})
                    res.status(200).json({message:`Update data success!`, updateData})
                }
            }
        } catch (err) {
            res.status(500).json({message: 'Error!', err})
        }
    }

    static deleteBook = async (req: Request, res: Response) => {
        try {
            const id = req.params.id
            
            // check if book data exist 
            const bookDb = await book.findAll({where: {id}})
            if (bookDb.length == 0) {
                res.status(404).json({message: `No data found!`})
            }
            else {
                const bookData = await book.destroy({where:{id}})
                res.status(201).json({message: `Data deleted!`, bookData})
            }
        } catch (err) {
            res.status(500).json({message: 'Error!', err})
        }
    }
}

export default BookController