const { DataTypes } = require("sequelize");
const sequelize = require("../configs/connectdb").sequelize;
const LoaiHoaDon = sequelize.define(
    "LoaiHoaDon",
    {
        mLHD: {
            type: DataTypes.BIGINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        tenLoaiHoaDon: { type: DataTypes.STRING, allowNull: false },
    },
    {
        freezeTableName: true,
        tableName: "LoaiHoaDons",
    }
);
LoaiHoaDon.sync();
module.exports = LoaiHoaDon;
