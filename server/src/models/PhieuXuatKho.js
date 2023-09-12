const { DataTypes } = require("sequelize");
const NhanhVien = require("./NhanVien");
const HoaDon = require("./HoaDon");
const sequelize = require("../configs/connectdb").sequelize;
const PhieuXuatKho = sequelize.define(
    "PhieuXuatKho",
    {
        mPXK: {
            type: DataTypes.BIGINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        NgayXuat: { type: DataTypes.DATE, allowNull: false },
        TrangThai: { type: DataTypes.BOOLEAN, allowNull: false },
    },
    {
        freezeTableName: true,
        tableName: "PhieuXuatKhos",
    }
);
PhieuXuatKho.belongsTo(NhanhVien,{
    foreignKey: "nguoiXuat",
    as: "NguoiXuat",
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
})
PhieuXuatKho.belongsTo(HoaDon,{
    foreignKey: "hoaDonId",
    as: "HoaDon",
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
})
PhieuXuatKho.sync();
module.exports = PhieuXuatKho;
