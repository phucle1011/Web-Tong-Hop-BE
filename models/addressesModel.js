const connection = require('../config/database');
const { DataTypes } = require('sequelize');

const AddressModel = connection.define('address', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    address_line: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ward: {
        type: DataTypes.STRING,
        allowNull: true  // ← đổi thành true
    },
    province: {
        type: DataTypes.STRING,
        allowNull: true  // ← thêm field mới thay city
    },
    city: {
        type: DataTypes.STRING,
        allowNull: true  // ← đổi thành true (giữ để không lỗi DB cũ)
    },
    district: {
        type: DataTypes.STRING,
        allowNull: true  // ← đổi thành true (giữ để không lỗi DB cũ)
    },
    is_default: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0
    }
}, {
    tableName: 'addresses',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = AddressModel;