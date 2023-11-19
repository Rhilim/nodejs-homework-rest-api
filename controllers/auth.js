function register(req, res, next) {
  const { name, email, password } = req.body;
  console.log({ name, email, password });

  res.send("OK!");
}

module.exports = { register };
