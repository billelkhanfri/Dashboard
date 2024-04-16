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
  "/users",
  asyncHandler(async (req, res) => {
    const users = await db.User.findAll({
      attributes: { exclude: ["password"] },
    });
    res.status(200).json(users);
  })
);

module.exports = route;
