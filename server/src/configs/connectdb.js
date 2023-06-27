const { Sequelize } = require('sequelize');
require('dotenv').config();
const sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
    host: process.env.DATABASE_HOST,
    dialect: 'mysql',
    logging: false
});
const authen = async()=>{
    console.log(process.env.DATABASE_HOST);
    sequelize.authenticate().then(()=>{
        console.log("connect database success");
    }).catch((error)=>{
        console.log("connect database fail :"+error);
    })
}
const creteTable = async()=>{
    await sequelize.sync().then(()=>{
        console.log("Create table success");
    })
}
module.exports= {
    sequelize,
    authen,
    creteTable
};