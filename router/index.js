const express = require("express");
const app = express.Router();
const Auth = require("./Auth/Router_Auth");
const Doc = require("./Doctor/Router_Doctor");
const Scheduler = require("./Schedule/Router_Schedule");
const Authorization = require("../middleware/Authorization");

app.use("/Auth", Auth);

app.use(Authorization);

app.use("/Doctor", Doc);
app.use("/Schedule", Scheduler);

module.exports = app;
