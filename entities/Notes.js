import db from '../dbConfig.js';
import Sequelize from 'sequelize';

const Notes=db.define("Notes",{
    NoteId:
    {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    NoteText: 
    {
        type: Sequelize.STRING,
        allowNull: false
    },
    UserId: 
    {
        type: Sequelize.INTEGER,
        allowNull: false
    },    
    SubjectId: 
    {
        type: Sequelize.INTEGER,
        allowNull: true
    }  ,
    NoteDate: 
    {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    NoteTags:{
        type:Sequelize.STRING,
        allowNull: true,
    }


})

export default Notes