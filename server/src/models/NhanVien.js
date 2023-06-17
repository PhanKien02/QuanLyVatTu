const { DataTypes } = require("sequelize");
const KhuVuc = require("./KhuVuc");
const XaPhuong = require("./XaPhuong");
const CongViec = require("./CongViec");
const User = require("./User");
const sequelize = require("../configs/connectdb").sequelize;
const NhanhVien = sequelize.define(
    "NhanhVien",
    {
        mNV: {
            type: DataTypes.BIGINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        tenNhanVien: { type: DataTypes.STRING, allowNull: false },
        ngaySinh: { type: DataTypes.DATE },
        gioiTinh: { type: DataTypes.BOOLEAN, allowNull: true },
        queQUan: { type: DataTypes.STRING },
        email: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                isEmail: true,  
            },
        },
        soDienThoai:{
            type: DataTypes.STRING(10),
            unique: true,
            validate:{
                is: ["^[0-9]+$",'i'],
            }
        }
    },
    {
        freezeTableName: true,
        tableName: "NhanhViens",
        createdAt: "createTimestamp",
        updatedAt: "updateTimestamp",
    }
);
NhanhVien.belongsTo(KhuVuc,{
    foreignKey: "mKV",
    as: "KhuVuc",
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
})
NhanhVien.belongsTo(XaPhuong,{
    foreignKey: "mXP",
    as: "XaPhuong",
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
})
NhanhVien.belongsTo(User,{
    foreignKey: "idUser",
    as: "user",
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
})
NhanhVien.belongsToMany(CongViec,{through : "PhanChiaCongViec"})
NhanhVien.sync();
module.exports = NhanhVien;
