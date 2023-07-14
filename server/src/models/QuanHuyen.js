const { DataTypes } = require("sequelize");
const sequelize = require("../configs/connectdb").sequelize;
import TinhThanh from "./TinhThanh";
import XaPhuong from "./XaPhuong"
const Quanhuyen = sequelize.define(
    "QuanHuyen",
    {
        mQH: {
            type: DataTypes.BIGINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        tenQuanHuyen: { type: DataTypes.STRING, allowNull: false },
    },
    {
        freezeTableName: true,
        tableName: "Quanhuyens"
    }
);
Quanhuyen.belongsTo(TinhThanh, {
    foreignKey: "tinhThanhId",
    as: "TinhThanh",
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
});
TinhThanh.hasMany(Quanhuyen,{
    foreignKey:"tinhThanhId",
    as :"QuanHuyen",
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
});
Quanhuyen.sync();
module.exports = Quanhuyen;
