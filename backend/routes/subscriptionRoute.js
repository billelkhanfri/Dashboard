const express = require("express");
const router = express.Router();
const subscriptionController = require("../controllers/subscriptionController");

// Route pour récupérer toutes les souscriptions avec leurs utilisateurs
router.get("/tecmoled", subscriptionController.getAllSubscriptionsWithUsers);

// Route pour créer un nouvel abonné
router.post("/tecmoled/subscriber", subscriptionController.createSubscriber);

// Route pour supprimer un abonné spécifique
router.delete(
  "/tecmoled/subscriber/:id",
  subscriptionController.deleteSubscriber
);

// Route pour mettre à jour un abonné spécifique
router.put(
  "/tecmoled/subscriber/:id",
  subscriptionController.updateSubscriber
);
module.exports = router;
