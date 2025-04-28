module.exports = (sequelize, DataTypes) => {
    const MentorSkill = sequelize.define('MentorSkill', {
      mentor_id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      skill_id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
    }, {
      tableName: 'mentor_skills',
      timestamps: false,
    });
  
    return MentorSkill;
  };
  