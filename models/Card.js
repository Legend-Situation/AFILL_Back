module.exports = (sequelize, DataTypes) => {
	const Card = sequelize.define(
		'Card',
		{
			cardId: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			cardTitle: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			startDate: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			endDate: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			keyword: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			role: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			impressions: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			imgUrl: {
				type: DataTypes.STRING,
				allowNull: true,
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

	Card.associate = models => {
		Card.belongsTo(models.Users, { foreignKey: 'userId', targetKey: 'userId' });
	};

	return Card;
};
