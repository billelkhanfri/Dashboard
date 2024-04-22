const db = require("../models");
const User = db.user;

const createUser = async (req, res) => {
  try {
    console.log("Request body:", req.body);

    // Vérifier si un utilisateur avec le même email existe déjà
    const existingUser = await User.findOne({
      where: { email: req.body.email },
    });

    if (existingUser) {
      // Si un utilisateur avec le même email existe déjà, renvoyer un message d'erreur
      return res.status(400).json({ error: "Cet utilisateur existe déjà" });
    }

    // Créer un nouvel utilisateur uniquement si aucun utilisateur avec le même email n'existe
    const newUser = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      subscriptionsId: req.body.subscriptionsId,
    });

    // Envoyer une réponse avec un message de succès
    res
      .status(201)
      .json({ success: "Utilisateur créé avec succès", user: newUser });
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur:", error);
    // Envoyer une réponse avec un message d'erreur
    res
      .status(500)
      .json({ error: "Erreur lors de la création de l'utilisateur" });
  }
};


/**
 * @desc Supprimer un utilisateur
 * @route DELETE /tecmoled/user/:id
 * @method DELETE
 * @access Private
 */
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const foundUser = await User.findByPk(id);
    if (!foundUser) {
      return res.status(404).json({ error: "User not found" });
    }
    await foundUser.destroy();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Error deleting user" });
  }
};



/**
 * @desc Mettre à jour un utilisateur
 * @route PUT /tecmoled/user/:id
 * @method PUT
 * @access Private
 */
const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    // Rechercher l'utilisateur à mettre à jour dans la base de données
    const foundUser = await User.findByPk(id);

    // Si l'utilisateur n'existe pas, renvoyer une erreur 404
    if (!foundUser) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    // Mettre à jour les propriétés de l'utilisateur avec les nouvelles données du corps de la requête
    foundUser.firstName = req.body.firstName;
    foundUser.lastName = req.body.lastName;
    foundUser.email = req.body.email;
    foundUser.password = req.body.password;
    foundUser.subscriptionsId = req.body.subscriptionsId;

    // Enregistrer les modifications dans la base de données
    await foundUser.save();

    // Envoyer une réponse avec un message de succès et les données de l'utilisateur mis à jour
    res.status(200).json({ success: "Utilisateur mis à jour avec succès", user: foundUser });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
    // Envoyer une réponse avec un message d'erreur
    res.status(500).json({ error: "Erreur lors de la mise à jour de l'utilisateur" });
  }
};

module.exports = {
  createUser,
  deleteUser,
  updateUser,
};
