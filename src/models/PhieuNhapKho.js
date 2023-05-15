const { DataTypes } = require("sequelize");
const NhaCungCap = require("./NhaCungCap");
const NhanhVien = require("./NhanVien");
const HoaDon = require("./HoaDon");
const sequelize = require("../configs/connectdb").sequelize;
const PhieuNhapKho = sequelize.define(
    "PhieuNhapKho",
    {
        mPNK: {
            type: DataTypes.BIGINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        NgayNhap: { type: DataTypes.DATE, allowNull: false },
    },
    {
        freezeTableName: true,
        tableName: "PhieuNhapKhos",
    }
);
PhieuNhapKho.belongsTo(NhaCungCap,{
    foreignKey: "mNCC",
    as: "NhaCungCap",
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
})
PhieuNhapKho.belongsTo(NhanhVien,{
    foreignKey: "nguoiNhap",
    as: "NguoiNhap",
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
})
PhieuNhapKho.belongsTo(HoaDon,{
    foreignKey: "hoaDonId",
    as: "HoaDon",
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
})
PhieuNhapKho.sync();
module.exports = PhieuNhapKho;
