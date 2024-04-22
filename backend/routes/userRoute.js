const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Route pour créer un nouvel utilisateur
router.post("/tecmoled/user", userController.createUser);

// Route pour supprimer un utilisateur
router.delete("/tecmoled/user/:id", userController.deleteUser);

// Route pour mettre à jour un utilisateur
router.put("/tecmoled/user/:id", userController.updateUser);

module.exports = router;
