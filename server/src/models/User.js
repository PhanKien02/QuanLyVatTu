const { DataTypes } = require("sequelize");
const sequelize = require("../configs/connectdb").sequelize;
import ChucVu from "./ChucVu";
import NhanhVien from "./NhanVien";
const User = sequelize.define(
    "User",
    {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        userName: { type: DataTypes.STRING, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false },
        active: { type: DataTypes.BOOLEAN, allowNull: true },
    },
    {
        freezeTableName: true,
        tableName: "users",
        createdAt: "createTimestamp",
        updatedAt: "updateTimestamp",
    }
);
User.belongsTo(ChucVu,{
    foreignKey: "chucvuId",
    as: "ChucVu",
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
});
User.sync();
module.exports = User;
