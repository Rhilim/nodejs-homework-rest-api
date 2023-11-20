const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Joi = require("joi");

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const loginSchema = Joi.object({
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


async function login(req, res, next) {
  const { email, password } = req.body;

  try {
    const validation = loginSchema.validate(
      { email, password },
      { abortEarly: false }
    );

    if (validation.error) {
      return res.status(400).json({
        message: `Validation error: ${validation.error.message}`,
      });
    }

    const user = await User.findOne({ email: email }).exec();

    if (user === null) {
      return res.status(401).send({ message: "Email or password is wrong" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch === false) {
      return res.status(401).send({ message: "Email or password is wrong" });
    }

    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.send({ token });
  } catch (error) {
    next(error);
  }
}

module.exports = { register, login };
