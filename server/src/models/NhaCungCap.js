const { DataTypes } = require("sequelize");
const CongViec = require("./CongViec");
const sequelize = require("../configs/connectdb").sequelize;
const NhaCungCap = sequelize.define(
    "NhaCungCap",
    {
        mNCC: {
            type: DataTypes.BIGINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        tenNhaCungCap: { type: DataTypes.STRING, allowNull: false },
        diaChiNCC: { type: DataTypes.DATE },
        NhapVienLienHe: { type: DataTypes.STRING },
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
        tableName: "NhaCungCaps",
    }
);
NhaCungCap.sync();
module.exports = NhaCungCap;
