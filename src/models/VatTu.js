const { DataTypes } = require("sequelize");
const KhuVuc = require("./KhuVuc");
const ChungLoaiVatTu = require("./ChungLoaiVatTu");
const sequelize = require("../configs/connectdb").sequelize;
const VatTu = sequelize.define(
    "VatTu",
    {
        mVT: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        tenVatTu: { type: DataTypes.STRING, allowNull: false },
        donViTinh : {type: DataTypes.STRING},
        soLuong : {type: DataTypes.INTEGER},
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
VatTu.belongsTo(ChungLoaiVatTu,{
    foreignKey: "xaPhuongId",
    as: "XaPhuong",
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
})
VatTu.sync();
module.exports = VatTu;
