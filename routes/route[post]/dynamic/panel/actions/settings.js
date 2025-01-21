let SETTINGS = require("../../../../../models/settings");

const index = async (fastify, options, done) => {
  fastify.post("/refuerzo/panel/settings", async (req, res) => {
    let username = req.session?.get("username") ?? null;
    let password = req.session?.get("password") ?? null;
    if (
      req.config.panel.username == username &&
      req.config.panel.password == password
    ) {
      let settings = await SETTINGS.findOne({ id: "refuerzo" });
      if (!settings) await new SETTINGS({ id: "refuerzo" }).save();
      if(!req.body.shipping || !req.body.successMsg) return res.send({ access: false, message: "Fill all inputs" });
      settings.shipping = req.body.shipping;
      settings.successMsg = req.body.successMsg;
      await settings.save();

      res.send({
        access: true,
        message: "Edit's has been successfully saved!",
      });
    } else res.send({ access: false });
  });

  done();
};

module.exports = index;
