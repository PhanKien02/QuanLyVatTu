const { DataTypes } = require("sequelize");
const sequelize = require("../configs/connectdb").sequelize;
import QuanHuyen from "./QuanHuyen";
const XaPhuong = sequelize.define(
    "XaPhuong",
    {
        mPX: {
            type: DataTypes.BIGINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        tenXaPhuong: { type: DataTypes.STRING, allowNull: false },
    },
    {
        freezeTableName: true,
        tableName: "XaPhuong",
    }
);
XaPhuong.belongsTo(QuanHuyen, {
    foreignKey: "quanHuyenId",
    as: "QuanHuyen",
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
});
XaPhuong.sync();
module.exports = XaPhuong;
