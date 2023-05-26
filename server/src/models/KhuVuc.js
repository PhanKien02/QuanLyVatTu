const { DataTypes } = require("sequelize");
const sequelize = require("../configs/connectdb").sequelize;
const KhuVuc = sequelize.define(
    "KhuVuc",
    {
        mkhu: {
            type: DataTypes.BIGINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        tenKhuVuc: { type: DataTypes.STRING, allowNull: false },
        sucChua: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
        freezeTableName: true,
        tableName: "khuVucs",
    }
);
KhuVuc.sync();
module.exports = KhuVuc;
