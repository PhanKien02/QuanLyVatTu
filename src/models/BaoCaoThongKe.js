const { DataTypes } = require("sequelize");
const sequelize = require("../configs/connectdb").sequelize;
import LoaiBaoCaoThongKe from "./LoaiBaoCaoThongKe"
import NhanVien from "./NhanVien"
const BaoCaoThongKe = sequelize.define(
    "BaoCaoThongKe",
    {
        mBCTK: {
            type: DataTypes.BIGINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        fileBaoCao: { type: DataTypes.STRING, allowNull: false },
        tinhTrang: { type: DataTypes.BOOLEAN, allowNull: false },

    },
    {
        freezeTableName: true,
        tableName: "BaoCaoThongKe",
        createdAt: "createTimestamp",
        updatedAt: "updateTimestamp",
    }
);
BaoCaoThongKe.belongsTo(LoaiBaoCaoThongKe,{
    foreignKey:"loaiBaoCaoThongKeId",
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
})
BaoCaoThongKe.belongsTo(NhanVien,{
    foreignKey:"NhanVienId",
    as :"NguoiXuat",
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
})
BaoCaoThongKe.sync();
module.exports = BaoCaoThongKe;

