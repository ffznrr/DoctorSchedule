const express = require("express");
const app = express.Router();
const Auth = require("./Auth/Router_Auth");
const Doc = require("./Doctor/Router_Doctor");
const DoctorControllers = require("../controllers/Doctor_controllers");

app.use("/Auth", Auth);
app.use("/Doctor", Doc);

module.exports = app;
