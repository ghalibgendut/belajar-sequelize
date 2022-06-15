import { Request, Response, NextFunction } from "express";
import authModel from './authModel';
const jwt = require('jsonwebtoken')
import  dotenv from "dotenv";
dotenv.config()

const auth = async (req: Request, res: Response, next: NextFunction) => {

    let token = req.header('Authorization');

    let decoded = jwt.verify(token, process.env.SECRET_KEY_JWT)

    await authModel.findAll({
        attributes: ['jwtToken'],
        where: {id: decoded.id}
    })

    next()

}

export default auth