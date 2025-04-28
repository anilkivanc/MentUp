module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define('Message', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      appointment_id: { type: DataTypes.UUID, allowNull: false },
      sender_id: { type: DataTypes.UUID, allowNull: false },
      content: { type: DataTypes.TEXT, allowNull: false },
      sent_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    }, {
      tableName: 'messages',
      timestamps: false,
    });
  
    Message.associate = (models) => {
      Message.belongsTo(models.Appointment, { foreignKey: 'appointment_id', onDelete: 'CASCADE' });
      Message.belongsTo(models.User, { foreignKey: 'sender_id', as: 'sender' });
    };
  
    return Message;
  };
  