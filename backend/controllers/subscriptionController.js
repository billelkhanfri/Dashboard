const db = require("../models");
const Subscription = db.subscription;

/**
 * @desc Get All Subscribers and their Users
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
    console.error("Error fetching subscriptions with users:", error);
    res.status(500).json({ error: "Error fetching subscriptions with users" });
  }
};

/**
 * @desc Create a Subscriber
 * @route /tecmoled/subscriber
 * @method POST
 * @access Private
 */
const createSubscriber = async (req, res) => {
  try {
    console.log("Request body:", req.body); // Ajoutez ce log pour vérifier les données reçues

    const newSubscriber = await Subscription.create({
      clientName: req.body.clientName,
      subscrState: req.body.subscrState,
      paymentDate: req.body.paymentDate,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      maxUser: req.body.maxUser,
      nbrUserOnline: req.body.nbrUserOnline,
    });

    res.status(201).json(newSubscriber);
  } catch (error) {
    console.error("Error creating subscriber:", error);
    res.status(500).json({ error: "Error creating subscriber" });
  }
};


module.exports = {
  getAllSubscriptionsWithUsers,
  createSubscriber,
};
