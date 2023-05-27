const { DataTypes } = require("sequelize");
const sequelize = require("../configs/connectdb").sequelize;
import LoaiHoaDon from "./LoaiHoaDon";
import NhanVien from "./NhanVien"
const HoaDon = sequelize.define(
    "HoaDon",
    {
        mHD: {
            type: DataTypes.BIGINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        tenHoaDon: { type: DataTypes.STRING, allowNull: false },
        trangThai: { type: DataTypes.BOOLEAN },
        fileHoaDon: { type: DataTypes.STRING },
    },
    {
        freezeTableName: true,
        tableName: "HoaDons",
        createdAt: "createTimestamp",
        updatedAt: "updateTimestamp",
    }
);
HoaDon.belongsTo(NhanVien,{
    foreignKey:"NguoiXuatId",
    as: "NguoiXuat",
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
})
HoaDon.belongsTo(LoaiHoaDon,{
    foreignKey:"LoaiHoaDonId",
    as: "LoaiHoaDon",
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
})
HoaDon.sync();
module.exports = HoaDon;
