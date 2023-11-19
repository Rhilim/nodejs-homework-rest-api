const bcrypt = require("bcrypt");
const User = require("../models/user");
const Joi = require("joi");

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

async function register(req, res, next) {
  const { email, password } = req.body;

  try {
    const validationResult = registerSchema.validate(
      { email, password },
      { abortEarly: false }
    );

    if (validationResult.error) {
      return res.status(400).send({
        message: `Validation error: ${validationResult.error.message}`,
      });
    }

    const user = await User.findOne({ email: email }).exec();

    if (user !== null) {
      return res.status(409).send({ message: "Email in use" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    await User.create({ email, password: passwordHash });

    res.status(201).send({ message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
}

module.exports = { register };
