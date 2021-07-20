// Convenience - assign express method to app variables
const express = require("express");
const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

const Restaurant = require("./models/Restaurant");

const Menu = require("./models/Menu");

const MenuItem = require("./Models/MenuItem");

// connects and creates database
const sequelizeConnect = require("./sequelize-connect");

const app = express();
const port = 3000;

// setup our templating engine
const handlebars = expressHandlebars({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})
app.engine('handlebars', handlebars)
app.set('view engine', 'handlebars')

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
app.get("/restaurants", async (request, response) => {
	const restaurants = await Restaurant.findAll();
	//response.send(restaurants);
	response.render("allRestaurantsTemplate", restaurants)
});

app.get("/restaurants/:id", async (request, response) => {
	const restaurantid = request.params.id;
	const restaurant = await Restaurant.findByPk(restaurantid, {
		include: [Menu], // This ensures that when searching for restaurants, that menu is joined/associated with it.
	});
	console.log(restaurant);

	if (restaurant === null) {
		response.sendStatus(404);
	} else {
		response.send(restaurant);
	}
});

// If there is no restaurant in the database, a 404 error will be sent back.

//CREATE
app.post("/restaurants", async (request, response) => {
	console.log(request.body); // Similiar to sending a letter, and needing to include an envelope, letter etc.

	await Restaurant.create({
		name: request.body.name,
		image: request.body.image,
	});
	response.sendStatus(201);
	response.send("Restaurant created");
});

//UPDATE
app.put("/restaurants/:id", async (request, response) => {
	console.log(request.params.id);
	console.log(request.body);

	await Restaurant.update(
		{
			name: request.body.name,
			image: request.body.image,
		},
		{
			where: {
				id: request.params.id,
			},
		}
	);
	response.send("Put resto");
});

//DELETE
app.delete("/restaurants/:id", async (request, response) => {
	await Restaurant.destroy({
		where: {
			id: request.params.id,
		},
	});
	response.send("Delete resto");
});

//READ
app.get("/menus", async (request, response) => {
	const menu = await Menu.findAll();
	response.send(menu);
});

app.get("/menus/:id", async (request, response) => {
	const menuid = request.params.id;
	const menu = await Menu.findByPk(menuid, {
		include: [Restaurant],
	});

	console.log(Menu);

	if (menu === null) {
		response.sendStatus(404);
	} else {
		response.send(menu);
	}
});
//CREATE
app.post("/menus", async (request, response) => {
	console.log(request.body); // Similiar to sending a letter, and needing to include an envelope, letter etc.

	await Menu.create({
		RestaurantId: request.body.restaurantid,
		name: request.body.name,
		image: request.body.image,
	});
	response.sendStatus(201);
	response.send("Menu created");
});
//UPDATE
app.put("/menus/:id", async (request, response) => {
	console.log(request.params.id);
	console.log(request.body);

	await Menu.update(
		{
			name: request.body.name,
			image: request.body.image,
		},
		{
			where: {
				id: request.params.id,
			},
		}
	);
	response.send("Put Menu");
});

//DELETE
app.delete("/menus/:id", async (request, response) => {
	await Menu.destroy({
		where: {
			id: request.params.id,
		},
	});
	response.send("Delete menu");
});

//READ
app.get("/menuitems", async (request, response) => {
	const menuitems = await MenuItem.findAll();
	response.send(menuitemsid, {
		include: [Menu],
	});
});

app.get("/menuitems/:id", async (request, response) => {
	const menuitemsid = request.params.id;
	const menuitems = await MenuItem.findByPk(menuitemsid, {
		include: [Menu],
	});
	console.log(Menu);

	if (menuitems === null) {
		response.sendStatus(404);
	} else {
		response.send(menuitems);
	}
});
//CREATE
app.post("/menuitems", async (request, response) => {
	console.log(request.body); // Similiar to sending a letter, and needing to include an envelope, letter etc.

	await MenuItem.create({
		MenuId: request.body.menuid,
		name: request.body.name,
		price: request.body.price,
	});
	response.sendStatus(201);
	response.send("Menu item created");
});

//UPDATE
app.put("/menuitems/:id", async (request, response) => {
	console.log(request.params.id);
	console.log(request.body);

	await MenuItem.update(
		{
			name: request.body.name,
			price: request.body.price,
		},
		{
			where: {
				id: request.params.id,
			},
		}
	);
	response.send("Put Menu Item");
});

//DELETE
app.delete("/menuitems/:id", async (request, response) => {
	await MenuItem.destroy({
		where: {
			id: request.params.id,
		},
	});
	response.send("Delete menu item");
});
