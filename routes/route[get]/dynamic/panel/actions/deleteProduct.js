const products = require("../../../../../models/products");

const index = async (fastify, options, done) => {
  fastify.get("/refuerzo/panel/products/:id/delete", async (req, res) => {
    let username = req.session?.get("username") ?? null;
    let password = req.session?.get("password") ?? null;
    if (
      req.config.panel.username == username &&
      req.config.panel.password == password
    ) {
     await products.findOne({ id: req.params.id }).deleteOne();
      return res.redirect("/refuerzo/panel/products")
    } else res.send({ access: false });
  });

  done();
};

module.exports = index;
