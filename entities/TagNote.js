
import db from '../dbConfig.js';
import Sequelize from 'sequelize';

const TagNote=db.define("TagNote",{
    TagId:
    {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    NoteId:
    {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: false,
        allowNull: false
    }
   
})

export default TagNote
