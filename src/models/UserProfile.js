 const { DataTypes } = require('sequelize');
 const sequelize = require('./index');
 const User = require('./User');

 const UserProfile = sequelize.define('UserProfile', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
     displayName: {
         type: DataTypes.STRING,
     },
     occupation: {
         type: DataTypes.STRING,
         allowNull: false,
     },  
     birthPlace: {
        type: DataTypes.STRING,
        allowNull: false,
     },
     location: {
        type: DataTypes.STRING,
        allowNull: false,
     },
     skills: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
     },
     languages: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
     },
 }, {
     timestamps: true,
 });

 UserProfile.belongsTo(User, { foreignKey: 'userId' });
 User.hasOne(UserProfile, { foreignKey: 'userId' });

 module.exports = UserProfile;
