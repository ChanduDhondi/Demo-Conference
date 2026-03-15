require("dotenv").config();
const express = require("express");
const cors = require("cors");

const homerouter = require("./routes/home.route");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", homerouter);

const port = process.env.PORT || 8080;
app.listen(port, (req, res) => {
  console.log(`App is listening on ${port}`);
});
