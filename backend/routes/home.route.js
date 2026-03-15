const express = require("express");
const route = express.Router();

const { homeController } = require("../controllers/homeController");

route.get("/home", homeController);
route.put("/home", homeController);

module.exports = route;
