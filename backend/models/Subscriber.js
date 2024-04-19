module.exports = (sequelize, DataTypes) => {
  const subscription = sequelize.define(
    "subscription",
    {
      // Define your attributes here
      clientName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subscrState: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      paymentDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      maxUser: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      nbrUserOnline: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      // Options object
      freezeTableName: true, // Disable auto table creation
      timestamps: false, // Disable createdAt and updatedAt fields
    }
  );

  subscription.associate = (models) => {
    subscription.hasMany(models.user, {
      foreignKey: "subscriptionsId", // This references the subscriptionsId column in the User table
      onDelete: "CASCADE",
    });
  };
  // Disable automatic synchronization with the database
  sequelize.sync({ force: false }); // Set force to false to prevent dropping tables

  return subscription;
};
