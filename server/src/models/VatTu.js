const { DataTypes } = require("sequelize");
const KhuVuc = require("./KhuVuc");
const LoaiVatTu = require("./LoaiVatTu");
const sequelize = require("../configs/connectdb").sequelize;
const VatTu = sequelize.define(
    "VatTu",
    {
        mVT: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        donGia : {type: DataTypes.INTEGER,allowNull:false,validate:{
            min:0
        }},
        tenVatTu: { type: DataTypes.STRING, allowNull: false },
        donViTinh : {type: DataTypes.STRING},
        soLuong : {type: DataTypes.INTEGER,validate:{
            min:0
        }},
        soLuongHong : {type: DataTypes.INTEGER},
        hanSuDung : {type: DataTypes.DATE},
    },
    {
        freezeTableName: true,
        tableName: "VaTu",
    }
);
VatTu.belongsTo(KhuVuc,{
    foreignKey: "khuVucId",
    as: "KhuVuc",
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
})
VatTu.belongsTo(LoaiVatTu,{
    foreignKey: "LoaiVatTuId",
    as: "LoaiVatTu",
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
})
VatTu.sync();
module.exports = VatTu;
