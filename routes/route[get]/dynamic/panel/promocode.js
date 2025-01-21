const index = async (fastify, options, done) => {
  fastify.get("/refuerzo/panel/promos/add", async (req, res) => {
    let username = req.session?.get("username") ?? null;
    let password = req.session?.get("password") ?? null;
    if (
      req.config.panel.username == username &&
      req.config.panel.password == password
    ) {
      return req.render("/dynamic/panel/promocode.liquid", {
        access: true,
      });
    }
    return req.render("/dynamic/panel.liquid", { access: false });
  });

  done();
};

module.exports = index;
