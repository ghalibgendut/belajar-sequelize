const user = require('./userModel')
import { Request, Response } from "express";
const bcrypt = require('bcrypt')


class UserController {

    static addUser = async (req:Request, res:Response) => {
        try {
            const salt = 12
            const userData = {
                email: req.body.email,
                password: await bcrypt.hashSync(req.body.password, salt)
            }

            const insertUserData = await user.create(userData)
            res.status(201).json({message: `Data added!`, insertUserData})

        } catch (err) {
            res.status(500).json({message: 'Error!', err})
        }
    }

    static findAllUser = async (req: Request, res: Response) => {
        try {
            const userData = await user.findAll()
            res.status(200).json({message: `Data retrived!`, userData})
        } catch (err) {
            res.status(500).json({message: 'Error!', err})
        }
    }

    static login =async (req:Request, res: Response) => {
        
        try {

            const email = req.body.email

            const userData = await user.findOne({where:{email}})
            const password = userData.password

            console.log(password);

            // Compare
            
            
            

            
        } catch (error) {
            
        }

    }
}

module.exports = UserController