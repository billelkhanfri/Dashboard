const express = require("express");
const app = express();

const cors = require("cors");

// Use cors middleware
app.use(cors());

const db = require("./models"); // Import Sequelize models
const userRoute = require("./routers/user-routes");
// Middleware to parse URL-encoded and JSON request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", userRoute);
// Sync Sequelize models with the database and start the server
db.sequelize.sync().then(() => {
  app.listen(3000, () => console.log("Server running on port 3000"));
});
