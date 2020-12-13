import db from '../dbConfig.js';
import Sequelize from 'sequelize';

const Attachments=db.define("Attachments",{

    AttachmentId:
    {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    NoteId: 
    {
        type: Sequelize.INTEGER,
        allowNull: false
    },
 
    AttachmentReff: 
    {
        type: Sequelize.STRING,
        allowNull: false
    }    
});

export default Attachments