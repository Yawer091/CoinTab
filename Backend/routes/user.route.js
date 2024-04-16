const express = require("express");
const { conne, connectionction } = require("../config/db");
// const app = express();
const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  try {
    const query = "SELECT * FROM user";

    connection.query(query, [], (err, result) => {
      if (err) {
        console.log("ERROR IN GETTING DATA");
      } else {
        res.status(200).send(result);
      }
    });
  } catch (err) {
    res.status(200).send({ err });
  }
});
userRouter.post("/", (req, res) => {
  try {
    const query =
      "INSERT INTO user(id, name, email, phone, website, city, company) VALUES(?,?,?,?,?,?,?)";

    const { id, name, email, phone, website, city, company } = req.body;
    connection.query(
      query,
      [id, name, email, phone, website, city, company],
      (err, result) => {
        if (err) {
          res.status(400).json("ERROR IN SENDING DATA", err);
        } else {
          res.status(200).json({ msg: "SUCCESFULLY ADDED USER" });
        }
      }
    );
  } catch (err) {
    res.status(200).send({ err });
  }
});
userRouter.get("/:id", (req, res) => {
  try {
    const id = req.params.id;
    const query = "SELECT * FROM user WHERE id = ?";

    connection.query(query, [id], (err, result) => {
      if (err) {
        res.status(500).send({ error: "ERROR IN GETTING DATA" });
      } else {
        if (result.length === 0) {
          res.status(404).send({ error: "User not found" });
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
  userRouter,
};
