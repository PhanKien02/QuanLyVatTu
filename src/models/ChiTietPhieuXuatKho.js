const { DataTypes } = require("sequelize");
const VatTu = require("./VatTu");
const PhieuXuatKho = require("./PhieuXuatKho");
const sequelize = require("../configs/connectdb").sequelize;
const ChiTietPhieuXuatKho = sequelize.define(
    "ChiTietPhieuXuatKho",
    {
        mCTPXK: {
            type: DataTypes.BIGINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        soLuongXuat: { type: DataTypes.INTEGER, allowNull: false },
        giaNhap: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
        freezeTableName: true,
        tableName: "ChiTietPhieuXuatKhos",
    }
);
ChiTietPhieuXuatKho.belongsTo(PhieuXuatKho,{
    foreignKey: "mPXK",
    as: "PhieuXuatKho",
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
})
ChiTietPhieuXuatKho.hasMany(VatTu,{
    foreignKey: "mVT",
    as: "VatTu",
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
})
ChiTietPhieuXuatKho.sync();
module.exports = ChiTietPhieuXuatKho;
