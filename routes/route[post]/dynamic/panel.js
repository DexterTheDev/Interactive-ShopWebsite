const index = async (fastify, options, done) => {
  fastify.post("/panel/login", async (req, res) => {
    let username = req.body?.username ?? "Unknown";
    let password = req.body?.password ?? "Unknown";

    if (
      req.config.panel.username == username &&
      req.config.panel.password == password
    ) {
      req.session?.set("password", password);
      req.session?.set("username", username);

      res.send({ access: true });
    }else res.send({ access: false });
  });

  done();
};

module.exports = index;
