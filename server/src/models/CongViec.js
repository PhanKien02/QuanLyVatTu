const { DataTypes } = require("sequelize");
const sequelize = require("../configs/connectdb").sequelize;
const CongViec = sequelize.define(
    "CongViec",
    {
        mCongViec: {
            type: DataTypes.BIGINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        tenCongViec: { type: DataTypes.STRING, allowNull: false },
        noiDung: { type: DataTypes.STRING },
        trangThai: {type : DataTypes.BOOLEAN}
    },
    {
        freezeTableName: true,
        tableName: "CongViecs",
        createdAt: "createTimestamp",
        updatedAt: "updateTimestamp",
    }
);
CongViec.sync();
module.exports = CongViec;
