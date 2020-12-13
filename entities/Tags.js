import db from '../dbConfig.js';
import Sequelize from 'sequelize';

const Tags=db.define("Tags",{
    TagId:
    {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    TagContent: 
    {
        type: Sequelize.STRING,
        allowNull: false
    },

   
})

export default Tags
