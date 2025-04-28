module.exports = (sequelize, DataTypes) => {
    const Appointment = sequelize.define('Appointment', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      mentor_id: { type: DataTypes.UUID, allowNull: false },
      mentee_id: { type: DataTypes.UUID, allowNull: false },
      scheduled_at: { type: DataTypes.DATE, allowNull: false },
      status: {
        type: DataTypes.ENUM('pending', 'confirmed', 'cancelled', 'completed'),
        allowNull: false,
        defaultValue: 'pending',
      },
    }, {
      tableName: 'appointments',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    });
  
    Appointment.associate = (models) => {
        Appointment.belongsTo(models.User, { foreignKey: 'mentor_id', as: 'mentor' });
        Appointment.belongsTo(models.User, { foreignKey: 'mentee_id', as: 'mentee' });
      
        Appointment.hasOne(models.Review, {
          foreignKey: 'appointment_id',
          as: 'review',
          onDelete: 'CASCADE'
        });
      
        Appointment.hasMany(models.Message, {
          foreignKey: 'appointment_id',
          as: 'messages',
          onDelete: 'CASCADE'
        });
      };
      
  
    return Appointment;
  };
  