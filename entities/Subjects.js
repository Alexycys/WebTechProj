import db from '../dbConfig.js';
import Sequelize from 'sequelize';

const Subjects = db.define("Subjects", 
{
    SubjectId:
    {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    SubjectName: 
    {
        type: Sequelize.STRING,
        allowNull: false
    },
    SubjectProfessor: 
    {
        type: Sequelize.STRING,
        allowNull: true
    },   
    SubjectClass:
    {
        type: Sequelize.INTEGER,
        allowNull: true
    },
       

});

export default Subjects;