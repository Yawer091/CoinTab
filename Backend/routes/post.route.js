const express = require("express");
const { connection } = require("../config/db");
const postRouter = express.Router();
postRouter.get("/", (req, res) => {
  try {
    const query = "SELECT * FROM post";

    connection.query(query, [], (err, result) => {
      if (err) {
        console.log("SOMETHING WENT WRONG ");
      } else {
        res.status(200).send(result);
      }
    });
  } catch (err) {
    res.status(200).send({ err });
  }
});
postRouter.post("/", (req, res) => {
  try {
    const query =
      "INSERT INTO post(id, name, userId, title, body, company) VALUES(?,?,?,?,?,?)";
    const { id, name, userId, title, body, company } = req.body;
    connection.query(
      query,
      [id, name, userId, title, body, company],
      (err, result) => {
        if (err) {
          console.log("SOMETHING WENT WRONG WHILE POSTING", err);
        } else {
          res.status(200).json({ msg: "POSTED SUCCESSFULLY" });
        }
      }
    );
  } catch (err) {
    res.status(200).send({ err });
  }
});
postRouter.get("/:id", (req, res) => {
  try {
    const userId = req.params.id;
    const query = "SELECT * FROM post WHERE userId = ?";

    connection.query(query, [userId], (err, result) => {
      if (err) {
        console.log("DATA NOT FOUND SOMETHING FALSE", err);
        res.status(500).send({ error: "DATA NOT FOUND" });
      } else {
        if (result.length === 0) {
          res.status(404).send({ error: "POST NOT FOUND" });
        } else {
          res.status(200).send(result[0]);
        }
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = {
  postRouter,
};
