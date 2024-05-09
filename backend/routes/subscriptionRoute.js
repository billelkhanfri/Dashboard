const express = require("express");
const router = express.Router();
const subscriptionController = require("../controllers/subscriptionController");

// Route pour récupérer toutes les souscriptions avec leurs utilisateurs
router.get("/api", subscriptionController.getAllSubscriptionsWithUsers);

// Route pour créer un nouvel abonné
router.post("/api/subscriber", subscriptionController.createSubscriber);

// Route pour supprimer un abonné spécifique
router.delete("/api/subscriber/:id", subscriptionController.deleteSubscriber);

// Route pour mettre à jour un abonné spécifique
router.put("/api/subscriber/:id", subscriptionController.updateSubscriber);
module.exports = router;
