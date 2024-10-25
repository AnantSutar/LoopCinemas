module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "movie",
    {
      movieTitle: {
        type: DataTypes.STRING(255),
        primaryKey: true,
      },
      genre: {
        type: DataTypes.STRING(40),
      },
      sessionTimes: {
        type: DataTypes.STRING(100),
      },
      desc: {
        type: DataTypes.STRING(300),
      },
      movieImage: {
        type: DataTypes.STRING(100),
      },
    },
    {
      // Don't add the timestamp attributes (updatedAt, createdAt).
      timestamps: false,
    }
  );
