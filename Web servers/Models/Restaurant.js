const { DataTypes, Model } = require('sequelize');
const dbConnection = require('../sequelize-connect');

class Restaurant extends Model {}

Restaurant.init(
  {
    name: DataTypes.STRING,
    image: DataTypes.STRING,
  },
  {
    sequelize: dbConnection,
    timestamps: false,
  }
);

module.exports = Restaurant;
