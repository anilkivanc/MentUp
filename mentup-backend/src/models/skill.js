module.exports = (sequelize, DataTypes) => {
    const Skill = sequelize.define('Skill', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    }, {
      tableName: 'skills',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    });
  
    Skill.associate = (models) => {
      Skill.belongsToMany(models.User, {
        through: models.MentorSkill,
        foreignKey: 'skill_id',
        as: 'mentors'
      });
    };
  
    return Skill;
  };
  