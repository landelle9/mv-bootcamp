const { DataTypes, Model } = require("sequelize");
const dbConnection = require("../sequelize-connect");

class Menu extends Model {}

Menu.init(
  {
    title: DataTypes.STRING  },
  {
    sequelize: dbConnection,
    timestamps: false,
  }
);

module.exports = Menu;
