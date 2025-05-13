require("dotenv").config();

const express = require("express");
const app = express();
const port = 3000;
const router = require("./router/index");
const ErrorHandling = require("./middleware/ErrorHandling");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", router);
app.use(ErrorHandling);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
