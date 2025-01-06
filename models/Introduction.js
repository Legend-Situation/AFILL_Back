module.exports = (sequelize, DataTypes) => {
  const Introduction = sequelize.define(
    'Introduction',
    {
      introductionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      des: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      cards: {
        type: DataTypes.STRING,  // JSON 대신 STRING 타입으로 변경
        allowNull: true,
        defaultValue: '',
        get() {
          const rawValue = this.getDataValue('cards');
          if (!rawValue) return [];
          try {
            return rawValue.split(',').map(Number);  // 쉼표로 구분된 문자열을 배열로 변환
          } catch (error) {
            return [];
          }
        },
        set(value) {
          if (Array.isArray(value)) {
            this.setDataValue('cards', value.join(','));  // 배열을 쉼표로 구분된 문자열로 변환
          } else {
            this.setDataValue('cards', String(value));
          }
        }
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'userId',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },

    },
    {
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    }
  );

  Introduction.associate = models => {
    Introduction.belongsTo(models.Users, { foreignKey: 'userId', targetKey: 'userId' });
  };

  return Introduction;
};
