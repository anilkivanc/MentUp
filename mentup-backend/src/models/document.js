module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define('Document', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: { 
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
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
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'mentor_application',
    },
    cv_url: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    degree_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    experience_years: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    why_mentor: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    skills: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    languages: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'documents',
    timestamps: false,
  });

  Document.associate = (models) => {
    Document.belongsTo(models.Profile, { foreignKey: 'user_id', as: 'user' }); // 'user' alias'ı ile ilişkilendirme
  };

  return Document;
};
