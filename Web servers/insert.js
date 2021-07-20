const sqlite3 = require('sqlite3').verbose();
const fsp = require('fs').promises; // Node.js file system module with promises
/**
This code illustrates how to load JSON data into an array.
*/
async function loadAndPrint() {
    const db = new sqlite3.Database('./restaurants.sqlite');
    // wait for the json file to be read
    try {
        const rawData = await fsp.readFile('./restaurants.json');
        // convert the file data into JS objects (arrays)
        const restaurantsArray = (JSON.parse(String(rawData)));


        db.serialize(function () {

            let menuId = 0
            //this type of for loop allows for easy reference to both the index, and the element itself
            for (const [restaurantIndex, restaurant] of restaurantsArray.entries()) {
                let stmt
                
                try {
                    stmt = db.prepare('INSERT INTO Restaurants (name, image) VALUES (?, ?)')
                    stmt.run(restaurant.name, restaurant.image)
                    
                } finally {
                    stmt.finalize();
                }

                restaurant.menus.forEach(menu => {
                    menuId++

                    try {
                        stmt = db.prepare('INSERT INTO Menus (title, restaurantId) VALUES (?, ?)')
                        stmt.run(menu.title, restaurantIndex+1)
                        
                    } finally {
                        stmt.finalize();
                    }

                    menu.items.forEach(item => {

                        try {
                            stmt = db.prepare('INSERT INTO MenuItems (name, price, menuId) VALUES (?, ?, ?)')
                            stmt.run(item.name, item.price, menuId)
                            
                        } finally {
                            stmt.finalize();
                        }
                    });
                });
            };

            //foreach loops make code more readable, in my opinion. also i think they're cool :)
            // restaurantsArray.forEach(restaurant => {
            //     console.log("\n"+restaurant.name)

            //     restaurant.menus.forEach(menu => {
            //         console.log("\n   ", menu.title);

            //         menu.items.forEach(item => {
            //             console.log("       ", item.name);
            //         });

            //     });

            // })

        });
    } catch (error) {
        // if we get here, our file read has filed
        console.error('problem reading the file'+ error);
    }
}
// main flow

module.exports = loadAndPrint()