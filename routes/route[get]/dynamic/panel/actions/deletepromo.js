const PROMOCODES = require("../../../../../models/promocodes");

const index = async (fastify, options, done) => {
  fastify.get("/refuerzo/panel/promos/delete/:id", async (req, res) => {
    let username = req.session?.get("username") ?? null;
    let password = req.session?.get("password") ?? null;
    if (
      req.config.panel.username == username &&
      req.config.panel.password == password
    ) {
      await PROMOCODES.findOne({ code: req.params.id }).deleteOne();
      return res.redirect("/refuerzo/panel");
    } else res.send({ access: false });
  });

  done();
};

module.exports = index;
