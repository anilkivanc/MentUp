const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Kullanıcı modeli tanımı
const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true, // Email formatını doğrular
        },
    },
    password: {
        type: DataTypes.STRING, // Şifreler string olmalı
        allowNull: false,
    },    
}, {
    tableName: 'users', // Veritabanındaki tablo adı
    timestamps: true,   // createdAt ve updatedAt sütunlarını otomatik oluşturur
});

User.associate = (models) => {
    User.hasOne(models.userProfile, {
        foreignKey: 'userId',
        as: 'profile',
        onDelete: 'CASCADE',
    });
};

module.exports = User;
