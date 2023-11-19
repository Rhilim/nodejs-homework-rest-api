const express = require("express");

const UsersController = require("../../controllers/users");

const router = express.Router();

const jsonParser = express.json();

router.post("/register", jsonParser, UsersController.register);

module.exports = router;
