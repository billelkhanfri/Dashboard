module.exports = (sequelize, DataTypes) => {
  const Profil = sequelize.define("Profil", {
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
    subscriptionsId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Profil.associate = (models) => {
    Profil.belongsTo(models.User, {
      onDelete: "CASCADE",
    });
  };

  return Profil;
};
