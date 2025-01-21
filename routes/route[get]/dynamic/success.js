let SETTINGS = require("../../../models/settings");

const index = async (fastify, options, done) => {
    fastify.get("/success/:id", async (req, res) => {
        if(!req.params.id) return req.render("./handlers/error.liquid", { status: 404 }, 404);
        let settings = await SETTINGS.findOne({ id: 'refuerzo' })
        if(!settings) await new SETTINGS({ id: 'refuerzo'}).save();
      return req.render("/dynamic/purchaseSuccess.liquid", { successMsg: settings.successMsg, productID: req.params.id});
    });
  
    done();
  };
  
  module.exports = index;
  