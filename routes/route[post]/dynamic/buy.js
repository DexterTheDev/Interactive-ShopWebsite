let ORDERS = require("../../../models/orders");
let PROMOCODES = require("../../../models/promocodes");
let SETTINGS = require("../../../models/settings");
const index = async (fastify, options, done) => {
  fastify.get("/refuerzo/panel", async (req, res) => {
    let username = req.session?.get("username") ?? null;
    let password = req.session?.get("password") ?? null;
    if (
      req.config.panel.username == username &&
      req.config.panel.password == password
    ) {
      const promoCodes = [];
      (await PROMOCODES.find({})).forEach((code) => {
        promoCodes.push({
          code: code.code,
          discount: code.discount,
          limit: code.limit,
          unlimited: code.unlimited,
          endDate: require("moment")(code.startDate + code.endDate).format(
            "LL"
          ),
        });
      });

      let settings = await SETTINGS.findOne({ id: "refuerzo" });
      if (!settings) await new SETTINGS({ id: "refuerzo" }).save();

      let orders = [];
      let num = 0;
      (await ORDERS.find({})).map((order) => {
        num++;
        orders.push({
          num,
          id: order.id,
          firstname: order.firstname,
          lastname: order.lastname,
          address: order.address,
          city: order.city,
          governorate: order.governorate,
          postal: order.postal,
          phone: order.phone,
          email: order.email,
          products: order.products,
        });
      });

      return req.render("/dynamic/panel.liquid", {
        access: true,
        successMsg: settings.successMsg,
        shipping: settings.shipping,
        orders,
        promoCodes,
      });
    }
    return req.render("/dynamic/panel.liquid", { access: false });
  });

  done();
};

module.exports = index;
