module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "movieticket",
    {
      ticketid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userticket: {
        type: DataTypes.INTEGER,
      },
    },
    {
      // Don't add the timestamp attributes (updatedAt, createdAt).
      timestamps: false,
    }
  );
