const { DataTypes } = require("sequelize");
const VatTu = require("./VatTu");
const PhieuNhapKho = require("./PhieuNhapKho");
const sequelize = require("../configs/connectdb").sequelize;
const ChiTietPhieuNhapKho = sequelize.define(
    "ChiTietPhieuNhapKho",
    {
        mCTPNK: {
            type: DataTypes.BIGINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        soLuongNhap: { type: DataTypes.INTEGER, allowNull: false },
        giaNhap: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
        freezeTableName: true,
        tableName: "ChiTietPhieuNhapKhos",
    }
);
ChiTietPhieuNhapKho.belongsTo(PhieuNhapKho,{
    foreignKey: "mPNK",
    as: "PhieuNhapKho",
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
})
ChiTietPhieuNhapKho.hasMany(VatTu,{
    foreignKey: "mVT",
    as: "VatTu",
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
})
ChiTietPhieuNhapKho.sync();
module.exports = ChiTietPhieuNhapKho;
