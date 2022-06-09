const user = require('./userModel')
const bcrypt = require('bcrypt');

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
        
    }

}

module.exports = UserController