module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define('Review', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      appointment_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 1, max: 5 }
      },
      comment: { type: DataTypes.TEXT },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    }, {
      tableName: 'reviews',
      timestamps: false,
    });
  
    Review.associate = (models) => {
      Review.belongsTo(models.Appointment, {
        foreignKey: 'appointment_id',
        as: 'appointment'
      });
    };
  
    return Review;
  };
  