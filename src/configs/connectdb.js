const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('doan', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
});
const authen = async()=>{
    sequelize.authenticate().then(()=>{
        console.log("connect database success");
    }).catch((error)=>{
        console.log("connect database fail :"+error);
    })
}
const creteTable = async()=>{
    await sequelize.sync()
}
module.exports= {
    sequelize,
    authen,
    creteTable
};