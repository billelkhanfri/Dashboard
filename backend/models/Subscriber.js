module.exports = (sequelize, DataTypes) => {
  const Subscriber = sequelize.define("Subscriber", {
    clientName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subscrState: {
      type: DataTypes.STRING,
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
  });

  Subscriber.associate = (models) => {
    // Assuming you have a User model
    Subscriber.belongsTo(models.User, {
      onDelete: "CASCADE", 
    });
  };

  return Subscriber;
};
