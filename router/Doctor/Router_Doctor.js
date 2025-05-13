const express = require("express");
const Doctor_controllers = require("../../controllers/Doctor_controllers");
const app = express();

app.get("/view", Doctor_controllers.GetDataDoctor);
app.post("/create", Doctor_controllers.CreateDataDoctor);

module.exports = app;
