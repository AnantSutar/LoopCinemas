module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "moviesession",
    {
      moviesessionid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      movietime: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      numtickets: {
        type: DataTypes.INTEGER,
      },
    },
    {
      // Don't add the timestamp attributes (updatedAt, createdAt).
      timestamps: false,
    }
  );
