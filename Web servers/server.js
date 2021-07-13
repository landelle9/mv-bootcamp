// Convenience - assign express method to app variables
const express = require("express");

const Restaurant = require("./models/Restaurant");

const Menu = require("./models/Menu");

const MenuItem = require("./Models/MenuItem");

// connects and creates database
const sequelizeConnect = require("./sequelize-connect");

const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

Restaurant.hasMany(Menu);
Menu.belongsTo(Restaurant);
Menu.hasMany(MenuItem);
MenuItem.belongsTo(Menu);

app.get("/now", (request, response) => {
  const date = new Date();
  response.send(date);
});

app.get("/flipcoin", (request, response) => {
  if (port == 3000) {
    response.send("heads");
  } else {
    response.send("tails");
  }
});
//READ
app.get("/restaurants", (request, response) => {
  response.send("All restos");
});
//CREATE
app.post("/restaurants", async (request, response) => {
  console.log(request.body); // Similiar to sending a letter, and needing to include an envelope, letter etc.

  await Restaurant.create(request.body);
  response.sendStatus(201);
});
//UPDATE
app.put("/restaurants", (request, response) => {
  response.send("Put resto");
});
//DELETE
app.delete("/restaurants", (request, response) => {
  response.send("Delete resto");
});
