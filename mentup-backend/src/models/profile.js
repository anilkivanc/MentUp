module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
    user_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    bio: DataTypes.TEXT,
    photo_url: DataTypes.TEXT,
    phone: DataTypes.STRING,
    college: DataTypes.STRING,
    location: DataTypes.STRING,
    skills: DataTypes.STRING,
    languages: DataTypes.STRING,
    verification_status: {
      type: DataTypes.ENUM('pending', 'approved', 'rejected'),
      defaultValue: 'pending',
    },
  }, {
    tableName: 'profiles',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  Profile.associate = (models) => {
    Profile.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
      as: 'user',
    });
  };

  return Profile;
};
