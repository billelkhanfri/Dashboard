module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      // Options object
      freezeTableName: true, // Disable auto table creation
      timestamps: false, // Disable createdAt and updatedAt fields
    }
  );

  user.associate = (models) => {
    user.belongsTo(models.subscription, {
      foreignKey: "subscriptionsId", // This will create a subscriptionsId column in the User table
      onDelete: "CASCADE",
    });
  };

  // Disable automatic synchronization with the database
  sequelize.sync({ force: false }); // Set force to false to prevent dropping tables
  return user;
};
