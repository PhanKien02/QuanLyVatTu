const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER,process.env.DATABASE_PASSWORD, {
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
    await sequelize.sync()
}
module.exports= {
    sequelize,
    authen,
    creteTable
};