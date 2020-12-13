import Sequelize from 'sequelize';

const db = new Sequelize({
    dialect: 'mssql',
    database: 'Products',
    username: 'sa',
    host: 'localhost',
    port: '55892',
    password: '123123',  
    validateBulkLoadParameters: true,
    define: {
    timestamps: false,
    freezeTableName: true
    }  
})

export default db;