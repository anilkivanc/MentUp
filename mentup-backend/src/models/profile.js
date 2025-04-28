module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
    user_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    bio: DataTypes.TEXT,
    photo_url: DataTypes.STRING,
    phone: DataTypes.STRING,
    occupation: DataTypes.STRING,
    birth_place: DataTypes.STRING,
    location: DataTypes.STRING,
    languages: DataTypes.STRING, // istersen ileride JSON olarak tutulabilir
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
