const Sequelize = require('sequelize');

// connects to sqlite on localhost
const dbConnection = new Sequelize('db', 'user', 'pass', {
  host: 'localhost',
  dialect: 'sqlite',
  storage: './restaurants.sqlite',
});

// launches sequelize and adds tables
dbConnection
  .sync({
      // drop all tables on sync
      force: true
  })
  .then(() => {
    console.log('Connected to DB');
  })
  .catch((err) => {
    console.log(err.message);
  });

module.exports = dbConnection;
