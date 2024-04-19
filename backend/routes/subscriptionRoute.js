// subscriptionRoute.js




const express = require("express");
const router = express.Router();
const subscriptionController = require("../controllers/subscriptionController");

// Route pour récupérer toutes les souscriptions avec leurs utilisateurs
router.get("/tecmoled", subscriptionController.getAllSubscriptionsWithUsers);

// Route pour créer un nouvel abonné
router.post("/tecmoled/subscriber", subscriptionController.createSubscriber);

module.exports = router;
