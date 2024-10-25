module.exports = (sequelize, DataTypes) =>
  sequelize.define("ratings", {
    value: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // Don't add the timestamp attributes (updatedAt, createdAt).
    timestamps: false,
  });
