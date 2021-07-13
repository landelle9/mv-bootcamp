const { DataTypes, Model } = require("sequelize");
const dbConnection = require("../sequelize-connect");

class MenuItem extends Model {}

MenuItem.init(
  {
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
  },
  {
    sequelize: dbConnection,
    timestamps: false,
  }
);

module.exports = MenuItem;
