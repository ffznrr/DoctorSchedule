const express = require("express");
const ScheduleControllers = require("../../controllers/Schedule_Controllers");
const app = express();

app.get("/view", ScheduleControllers.GetDataSchedule);

module.exports = app;
