module.exports = (sequelize, DataTypes) => {
    const Document = sequelize.define('Document', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      user_id: { type: DataTypes.UUID, allowNull: false },
      type: { type: DataTypes.STRING, allowNull: false },
      file_url: { type: DataTypes.TEXT, allowNull: false },
      status: {
        type: DataTypes.ENUM('pending', 'approved', 'rejected'),
        allowNull: false,
        defaultValue: 'pending',
      },
      uploaded_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    }, {
      tableName: 'documents',
      timestamps: false,
    });
  
    Document.associate = (models) => {
      Document.belongsTo(models.User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
    };
  
    return Document;
  };
  