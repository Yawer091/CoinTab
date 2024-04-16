const express = require("express");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.route");
const { postTable } = require("./middlewares/post.Table");
const { userTable } = require("./middlewares/user.Table");
const cors = require("cors");
const { postRouter } = require("./routes/post.route");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/user", postTable, userRouter);
app.use("/post", userTable, postRouter);

app.get("/", (req, res) => {
  res.status(200).json({ msg: "this is home route" });
});

app.listen(process.env.port, () => {
  connection.connect((err) => {
    if (err) {
      console.log("we got error while connectioin with databse", err);
    } else {
      console.log("connected to database");
    }
    console.log("app is running");
  });
});
