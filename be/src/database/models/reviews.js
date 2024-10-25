module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "moviereview",
    {
      post_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      reviewtext: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      ratingvalue: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      // Don't add the timestamp attributes (updatedAt, createdAt).
      timestamps: false,
    }
  );
