const { database } = require("../config/db");

function userTable(req, res, next) {
  const query = `CREATE TABLE IF NOT EXISTS post(
        id INT PRIMARY KEY,
        userId INT,
        name VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        body VARCHAR(255) NOT NULL,
        company VARCHAR(255) NOT NULL
    )`;

  database.query(query, (err, result) => {
    if (err) {
      console.log("Table Not Created", err);
    } else {
      console.log("Table created for posts");
      next();
    }
  });
}

module.exports = {
  userTable,
};
