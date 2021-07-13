const fsp = require("fs").promises; // Node.js file system module with promises
async function load() {
  // wait for the json file to be read
  try {
    const rawData = await fsp.readFile("./restaurants.json");
    // convert the file data into JS objects (arrays)
    const restaurantsArray = JSON.parse(String(rawData));
    console.log("array is: length" + restaurantsArray.length);
    // loop through the restaurantsArray to get hold of the list of restaurants
    for (let i = 0; i < restaurantsArray.length; i++) {
      const currentRestaurant = restaurantsArray[i];
      console.log("-------------------------");
      console.log(currentRestaurant.name); // print name of each restaurant
    }
  } catch (error) {
    // if we get here, our file read has filed
    console.error("problem reading the file");
  }
}
// main flow
load();
