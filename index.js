require("dotenv").config();
require("./app/setup");
const express = require("express");
const eventRoutes = require("./app/routes/event");

const app = express();
const port = process.env.RESIDENT_APP_PORT || 8000;

app.use("/", eventRoutes);

app.use(function (_, res) {
  res.status(404).send("Path not implemented!");
});
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
