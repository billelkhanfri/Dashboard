const express = require("express");
const app = express();
const db = require("./models");
const bodyParser = require("body-parser");
const cors = require("cors");

// Utilisation de body-parser middleware pour analyser les requêtes JSON
app.use(bodyParser.json());




// Set timezone to UTC
process.env.TZ = 'UTC';
// Use cors middleware
app.use(cors());
const subscriptionRoute = require("./routes/subscriptionRoute");
const userRoute = require("./routes/userRoute");

// Utilisez le routeur subscriptionRoute
app.use("/", subscriptionRoute);
app.use("/", userRoute);

// Sync Sequelize models with the database and start the server
db.sequelize.sync().then(() => {
  app.listen(3000, () => console.log("Server running on port 3000"));
});
