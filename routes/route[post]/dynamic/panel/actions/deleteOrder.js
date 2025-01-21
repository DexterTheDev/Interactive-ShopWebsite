let orders = require("../../../../../models/orders");

const index = async (fastify, options, done) => {
  fastify.post("/refuerzo/panel/orders/:id", async (req, res) => {
    let username = req.session?.get("username") ?? null;
    let password = req.session?.get("password") ?? null;
    if (
      req.config.panel.username == username &&
      req.config.panel.password == password
    ) {
     await orders.findOne({ id: req.params.id }).deleteOne();
      res.send({ access: true });
    } else res.send({ access: false });
  });

  done();
};

module.exports = index;
