const { DataTypes } = require("sequelize");
const sequelize = require("../configs/connectdb").sequelize;
const LoaiBaoCaoThongKe = sequelize.define(
    "LoaiLoaiBaoCaoThongKe",
    {
        mLBC: {
            type: DataTypes.BIGINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        tenLoaiBaoCaoThongKe: { type: DataTypes.STRING, allowNull: false },
    },
    {
        freezeTableName: true,
        tableName: "LoaiBaoCaoThongKe"
    }
);
LoaiBaoCaoThongKe.sync();
module.exports = LoaiBaoCaoThongKe;

