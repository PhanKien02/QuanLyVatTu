const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('doan', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});
const authen = async()=>{
    sequelize.authenticate().then(()=>{
        console.log("connect database success");
    }).catch((error)=>{
        console.log("connect database fail :"+error);
    })
}
const creteTable = async()=>{
    await sequelize.sync({alter: true})
}
module.exports= {
    sequelize,
    authen,
    creteTable
};