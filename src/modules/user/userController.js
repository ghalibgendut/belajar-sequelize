const user = require('./userModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const authModel = require('../../middleware/authModel')

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
                let token = jwt.sign({id: result.dataValues.id}, 'secret_key')
                
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

    static userProfile = async (req, res) => {
        
    }

}

module.exports = UserController