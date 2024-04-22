const db = require("../models");
const Subscription = db.subscription;

/**
 * @desc Récupérer tous les abonnés et leurs utilisateurs
 * @route /tecmoled
 * @method GET
 * @access Private
 */
const getAllSubscriptionsWithUsers = async (req, res) => {
  try {
    const subscriptionsWithUsers = await Subscription.findAll({
      include: db.user,
    });

    res.status(200).json(subscriptionsWithUsers);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des abonnements avec les utilisateurs :",
      error
    );
    res
      .status(500)
      .json({
        error:
          "Erreur lors de la récupération des abonnements avec les utilisateurs",
      });
  }
};

/**
 * @desc Créer un abonné
 * @route /tecmoled/subscriber
 * @method POST
 * @access Private
 */
const createSubscriber = async (req, res) => {
  try {
    console.log("Corps de la requête :", req.body);
    // Vérifier si un abonné avec le même nom de client existe déjà
    const existingSubscriber = await Subscription.findOne({
      where: { clientName: req.body.clientName },
    });

    if (existingSubscriber) {
      // Si un abonné avec le même nom de client existe déjà, renvoyer un message d'erreur
      return res.status(400).json({ error: "Cet abonné existe déjà" });
    }

    const newSubscriber = await Subscription.create({
      clientName: req.body.clientName,
      subscrState: req.body.subscrState,
      paymentDate: req.body.paymentDate,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      maxUser: req.body.maxUser,
      nbrUserOnline: req.body.nbrUserOnline,
    });

    res
      .status(201)
      .json({ success: "Abonné créé avec succès", user: newSubscriber });
  } catch (error) {
    console.error("Erreur lors de la création de l'abonné :", error);
    res.status(500).json({ error: "Erreur lors de la création de l'abonné" });
  }
};

/**
 * @desc Supprimer un abonné
 * @route /tecmoled/subscriber/:id
 * @method DELETE
 * @access Private
 */
const deleteSubscriber = async (req, res) => {
  const { id } = req.params;
  try {
    const subscriber = await Subscription.findByPk(id);
    if (!subscriber) {
      return res.status(404).json({ error: "Abonné non trouvé" });
    }
    await subscriber.destroy();
    res.status(200).json({ message: "Abonné supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'abonné :", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la suppression de l'abonné" });
  }
};

/**
 * @desc Mettre à jour un abonné
 * @route /tecmoled/subscriber/:id
 * @method PUT
 * @access Private
 */
const updateSubscriber = async (req, res) => {
  const { id } = req.params;
  try {
    // Trouver l'abonné par son identifiant
    const subscriber = await Subscription.findByPk(id, { where: { id } });
    if (!subscriber) {
      return res.status(404).json({ error: "Abonné non trouvé" });
    }
    // Mettre à jour les champs de l'abonné
    await subscriber.update({
      clientName: req.body.clientName,
      subscrState: req.body.subscrState,
      paymentDate: req.body.paymentDate,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      maxUser: req.body.maxUser,
      nbrUserOnline: req.body.nbrUserOnline,
    });
    // Retourner une réponse de réussite avec l'abonné mis à jour
    res
      .status(200)
      .json({ message: "Abonné mis à jour avec succès", subscriber });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'abonné :", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la mise à jour de l'abonné" });
  }
};

module.exports = {
  getAllSubscriptionsWithUsers,
  createSubscriber,
  deleteSubscriber,
  updateSubscriber,
};
