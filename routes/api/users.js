const express = require("express");

const UsersController = require("../../controllers/users");

const router = express.Router();

const jsonParser = express.json();

router.post("/register", jsonParser, UsersController.register);
router.post("/login", jsonParser, UsersController.login);

module.exports = router;
