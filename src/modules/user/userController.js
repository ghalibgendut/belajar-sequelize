const user = require('./userModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const authModel = require('../../middleware/authModel');

class UserController{

    static newUser = async (req, res) => {
        try {
            const data = {
                username: req.body.username,
                password: bcrypt.hashSync(req.body.password, 10),
                FullName: req.body.fullName,
                address: req.body.address,
                createdAt: new Date(Date.now())
            }

            const insertData = await user.create(data)

            res.status(200).json({message: 'User Added!', insertData})
            
        } catch (err) {
            res.status(500).json({message: 'Error!', err})
        }
    }

    static login = async (req, res) => {
        try {

            const {username, password} = req.body
            let result

            let userData = await user.findAll({
                attributes: ['id', 'username', 'password' ,'FullName', 'address'],
                where: {username}
            })


            if (userData.length == 0) {
                res.status(404).json({message:`Data not found!`})
            }
            else {
                
                result = userData[0]
                
                // compare password
                let pass = bcrypt.compareSync(password, result.dataValues.password)
                if (!pass) {
                    res.status(400).json({message:`Wrong username or password!`})
                }

                // sign jwt
                let token = jwt.sign({id: result.dataValues.id}, 'secret_key', {expiresIn: '5h'})
                
                const tokenData = {
                    userId: result.dataValues.id, 
                    jwtToken: token,
                    createdAt: new Date(Date.now())
                }

                // insert data token
                await authModel.create(tokenData)

                res.status(200).json({
                    message: 'User Logedin!', 
                    username: result.username,
                    fullName: result.FullName,
                    address: result.address,
                    jwt: tokenData.jwtToken
                })
            }
        } catch (err) {
            res.status(500).json({message: 'Error!', err})
        }
    }

    static logout = async (req, res) => {

        try {

            const userId = req.params.userId

            const authData = await authModel.destroy({where:{userId}})
            res.status(201).json({message: `User logedout!`, authData})
            
        } catch (err) {
            res.status(500).json({message: 'Error!', err})
        }
    }

    static userProfile = async (req, res) => {
        try {
            const userId = req.params.userId
        
            let userData = await user.findAll({
                attributes: ['username', 'FullName', 'address'],
                where: {id: userId}
            })

            res.status(200).json({message: "Data Retrived!", userData})

        } catch (err) {
            res.status(500).json({message: 'Error!', err})
        }
    }

    static editProfile = async (req, res) => {
        try {
            const userId = req.params.userId
            let data = {
                username: req.body.username ? req.body.username : "",
                FullName: req.body.FullName ? req.body.FullName : "",
                address: req.body.address ? req.body.address : ""
            }

            const userData = await user.findAll({where: {id: userId}})
            if (userData.length == 0) {
                res.status(404).json({message: `No data found!`})
            }
            else{
                let userObj = userData[0].dataValues

                const updateData = await user.update({
                    username: data.username ? data.username : userObj.username,
                    password: userObj.password,
                    FullName: data.FullName ? data.FullName : userObj.FullName,
                    address: data.address ? data.address : userObj.address,
                    updatedAt: new Date(Date.now())
                },{where: {id: userId}})

                res.status(200).json({message:`Update data success!`, updateData})
            }
        } catch (err) {
            res.status(500).json({message: 'Error!', err})
        }
    }

}

module.exports = UserController