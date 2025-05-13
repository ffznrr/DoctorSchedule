const express = require("express");
const Authentication = require("../../controllers/Auth_Controllers");
const app = express();

app.post("/Register", Authentication.Register);
app.post("/Login", Authentication.Login);

module.exports = app;
