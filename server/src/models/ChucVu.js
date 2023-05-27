const { DataTypes } = require("sequelize");
const sequelize = require("../configs/connectdb").sequelize;
const ChucVu = sequelize.define(
    "ChucVu",
    {
        mchucVu: {
            type: DataTypes.BIGINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        tenChucvu: { type: DataTypes.STRING, allowNull: false },
    },
    {
        freezeTableName: true,
        tableName: "ChucVu",
    }
);
ChucVu.sync();
module.exports = ChucVu;

