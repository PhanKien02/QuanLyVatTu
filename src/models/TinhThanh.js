const { DataTypes } = require("sequelize");
const sequelize = require("../configs/connectdb").sequelize;
const TinhThanh = sequelize.define(
    "TinhThanh",
    {
        mTT: {
            type: DataTypes.BIGINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        tenTinhThanh: { type: DataTypes.STRING, allowNull: false },
    },
    {
        freezeTableName: true,
        tableName: "TinhThanhs",
    }
);
TinhThanh.sync();
module.exports = TinhThanh;
