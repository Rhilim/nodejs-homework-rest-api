const jwt = require("jsonwebtoken");

/* eslint-disable dot-notation */
function auth(req, res, next) {
  const authHeader = req.headers["authorization"];

  const [bearer, token] = authHeader.split(" ", 2);
  if (bearer !== "Bearer") {
    return res.status(401).send({ message: "Not authorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
    if (err) {
      return res.status(401).send({ message: "Not authorized" });
    }
    req.user = decode;

    next();
  });
}

module.exports = auth;
