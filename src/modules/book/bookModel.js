const db = require('../../../config/db')
const Sequelize = require('sequelize')

const bookModel = db.define('book', {
    'id': {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    'isbn': Sequelize.STRING,
    'name': Sequelize.STRING,
    'year': Sequelize.STRING,
    'author': Sequelize.STRING,
    'description': Sequelize.TEXT,
    'image': {
        type: Sequelize.STRING,
        //Set custom getter for book image using URL
        get(){
            const image = this.getDataValue('image');
            return "/img/"+image;
        }
    },
    'createdAt': {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },    
    'updatedAt': {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },   
    
}, {
    //prevent sequelize transform table name into plural
    freezeTableName: true,
})

module.exports = bookModel