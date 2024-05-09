const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Route pour créer un nouvel utilisateur
router.post("/api/user", userController.createUser);

// Route pour supprimer un utilisateur
router.delete("/api/user/:id", userController.deleteUser);

// Route pour mettre à jour un utilisateur
router.put("/api/user/:id", userController.updateUser);

module.exports = router;
