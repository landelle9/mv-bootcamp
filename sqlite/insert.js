const sqlite3 = require("sqlite3").verbose();
/**
 * This code inserts some rows in the tables for the Restaurants assignment
 */
function insert() {
  // connect to a database named restaurants.sqlite
  const db = new sqlite3.Database("./restaurants.sqlite");
  try {
    db.serialize(function () {
      // serialize means execute one statement at a time
      console.log("inserting some data");
      let stmt;
      // insert a row into the RESTAURANTS table
      try {
        // for security reasons - very important to use a
        // prepared statement here
        stmt = db.prepare(
          `INSERT INTO RESTAURANTS (name, imagelink) VALUES (?, ?)`
        );
        stmt.run(
          "TGI FRIDAYS",
          "https://en.wikipedia.org/wiki/TGI_Fridays#/media/File:Tgi_fridays_logo13.svg"
        );
      } finally {
        // IMPORTANT! Close the statement
        stmt.finalize();
      }
      try {
        // for security reasons - very important to use a
        // prepared statement here
        stmt = db.prepare(`INSERT INTO MENUS (title, id) VALUES (?, ?)`);
        stmt.run("STARTERS", 01);
      } finally {
        // IMPORTANT! Close the statement
        stmt.finalize();
      }
      try {
        // for security reasons - very important to use a
        // prepared statement here
        stmt = db.prepare(`INSERT INTO MENU_ITEMS (name, price) VALUES (?, ?)`);
        stmt.run("Calamari", 4.99);
      } finally {
        // IMPORTANT! Close the statement
        stmt.finalize();
      }
    });
  } finally {
    // very important to always close database connections
    // else could lead to memory leaks
    db.close();
    console.log("table insert complete - connection closed");
  }
}
module.exports = insert;
// local testing (comment out if running tests from jest)
insert();
