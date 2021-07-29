// Convenience - assign express method to app variables
// Each variable 'requires' individual files. Extracts files into this one, so it is accessible.

const express = require("express");
const Handlebars = require("handlebars");
const expressHandlebars = require("express-handlebars");
const {
	allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

const Restaurant = require("./models/Restaurant");

const Menu = require("./models/Menu");

const MenuItem = require("./Models/MenuItem");

// connects and creates database
const sequelizeConnect = require("./sequelize-connect");
const { response } = require("express");

const app = express(); // Creates an express application
const port = 3000; // Our localhost:3000.

// setup our templating engine
const handlebars = expressHandlebars({
	handlebars: allowInsecurePrototypeAccess(Handlebars),
});
app.engine("handlebars", handlebars);
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
	console.log(`Server listening at http://localhost:${port}`);
});

// Shows the relationships between the different classes
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

app.get("/restaurants/create", async (request, response) => {
	// response.send("Hello!");
	response.render("newRestaurantTemplate");
});

app.get("/restaurants/:id/edit", async (request, response) => {
	const restaurantid = request.params.id;
	console.log("restaurant id is" + restaurantid);
	response.render("editRestaurantTemplate", { restaurantid }); // The end point when you click the edit button - render means return back template as HTML
});

app.get("/restaurants/:id/menus/create", async (request, response) => {
	const restaurantid = request.params.id;
	console.log("Restaurant id is " + restaurantid);
	response.render("newMenuTemplate", { restaurantid });
});
//READ - Gets all the restaurants
app.get("/restaurants", async (request, response) => {
	const restaurants = await Restaurant.findAll();
	//response.send(restaurants);
	//console.log(restaurants);
	response.render("allRestaurantsTemplate", { restaurants });
});

app.get("/restaurants/:id", async (request, response) => {
	const restaurantid = request.params.id;
	const restaurant = await Restaurant.findByPk(restaurantid, {
		include: [
			{
				model: Menu,
				include: [MenuItem], // This ensures both the Menu & Menuitems show on the website.
			},
		], // This ensures that when searching for restaurants, that menu is joined/associated with it.
	});
	//console.log(restaurant);

	if (restaurant === null) {
		response.sendStatus(404); // If there is no response, an error of 404 will be sent back.
	} else {
		response.render("restaurantTemplate", { restaurant });
		// response.send(restaurant);
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
	//response.sendStatus(201);
	response.redirect("/restaurants");
});

// If there is a restaurant created, a code of 200 and above will be sent back from the server.

//UPDATE
app.post("/restaurants/:id", async (request, response) => {
	//console.log("Hello Leah");
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
		} // Form data is request body
		// Id is sent in URL so is sent as params
	);
	response.redirect("/restaurants");
});

// When a restaurant is update, it should be updated with a name and an image

//DELETE
app.get("/restaurants/:id/delete", async (request, response) => {
	await Restaurant.destroy({
		where: {
			id: request.params.id,
		},
	});
	response.redirect("/restaurants"); // When the delete button is clicked, the page will refresh, and the restaurant deleted.
});

//READ
app.get("/menus", async (request, response) => {
	const menu = await Menu.findAll();
	response.redirect("/restaurants");
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
app.post("/menus/:id", async (request, response) => {
	console.log("Menu restaurant id is" + request.params.id); // Similiar to sending a letter, and needing to include an envelope, letter etc.

	await Menu.create({
		RestaurantId: request.params.id, // Params is requested due to the ID being requested in the URL
		title: request.body.title, // body is requested because the form gets rendered & sent back
	});
	//response.sendStatus(201);
	response.redirect("/menus"); // Redirects back to the Menu page
	//response.send("Menu created");
});
//UPDATE
app.post("/menus/:id", async (request, response) => {
	//console.log("Hello Leah");
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
	response.redirect("/menus");
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
