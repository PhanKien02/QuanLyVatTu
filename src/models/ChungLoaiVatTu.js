const { DataTypes } = require("sequelize");
const sequelize = require("../configs/connectdb").sequelize;
const ChungLoaiVatTu = sequelize.define(
    "ChungLoaiVatTu",
    {
        mCLVT: {
            type: DataTypes.BIGINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        tenChungLoaiVatTu: { type: DataTypes.STRING, allowNull: false },
    },
    {
        freezeTableName: true,
        tableName: "ChungLoaiVatTu",
    }
);

ChungLoaiVatTu.sync();
module.exports = ChungLoaiVatTu;
