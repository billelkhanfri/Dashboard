const asyncHandler = require("express-async-handler");
const express = require("express");
const route = express.Router();
const db = require("../models");

/**
 * @desc Get All Users
 * @route /users
 * @method GET
 * @access private (only admin)
 */
route.get(
  "/subscribers",
  asyncHandler(async (req, res) => {
    const subscribers = await db.Subscriber.findAll({});
    res.status(200).json(subscribers);
  })
);

module.exports = route;
