const { DataTypes } = require("sequelize");
import ChungLoaiVatTu from"./ChungLoaiVatTu"
const sequelize = require("../configs/connectdb").sequelize;
const LoaiVatTu = sequelize.define(
    "LoaiVatTu",
    {
        mLVT: {
            type: DataTypes.BIGINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        tenLoaiVatTu: { type: DataTypes.STRING, allowNull: false },
    },
    {
        freezeTableName: true,
        tableName: "LoaiVatTu",
    }
);
LoaiVatTu.belongsTo(ChungLoaiVatTu, {
    foreignKey: "mCLVT",
    as: "ChungLoaiVatTu",
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
});

LoaiVatTu.sync();
module.exports = LoaiVatTu;
