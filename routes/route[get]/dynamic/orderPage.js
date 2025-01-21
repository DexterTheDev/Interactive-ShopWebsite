let PRODUCTS = require("../../../models/products");
let ORDERS = require("../../../models/orders");
let SETTINGS = require("../../../models/settings");
let PROMOCODES = require("../../../models/promocodes");
const index = async (fastify, options, done) => {
  fastify.get("/refuerzo/panel/orders/:id", async (req, res) => {
    let username = req.session?.get("username") ?? null;
    let password = req.session?.get("password") ?? null;
    if (
      req.config.panel.username == username &&
      req.config.panel.password == password
    ) {
      let settings = await SETTINGS.findOne({ id: "refuerzo" });
      if (!settings) await new SETTINGS({ id: "refuerzo" }).save();
      if (!req.params.id)
        return req.render("./handlers/error.liquid", { status: 404 }, 404);
      else {
        let order = await ORDERS.findOne({ id: req.params.id });

        if (!order)
          return req.render("./handlers/error.liquid", { status: 404 }, 404);
        else {
          let orderDetails = {};
          let products = [];
          let total = 0;

          await Promise.all(await order.products.map(async (or) => {
            let check = await PRODUCTS.findOne({ id: or.productID });
            if (check) {
              products.push({
                name: check?.name ?? "Deleted Product",
                price: (check.sale > 0 ? check?.sale ?? 0 : check?.price ?? 0) * or.quantity,
                isSale: check.sale > 0 ? true : false,
                size: or.size ?? "Deleted Product",
                quantity: or.quantity ?? "Deleted Product",
                image: or.image ?? "Deleted Product",
              });
              total += Number((check.sale > 0 ? check?.sale ?? 0 : check?.price ?? 0) * or.quantity);
            }
          })).then(async () => {
            total += settings.shipping;

            let promo = await PROMOCODES.findOne({ code: order.isPromo });
            if (promo) total -= promo.discount;

            orderDetails = {
              total,
              id: order.id,
              firstname: order.firstname,
              lastname: order.lastname,
              address: order.address,
              city: order.city,
              governorate: order.governorate,
              postal: order.postal,
              phone: order.phone,
              email: order.email,
              products,
              promoCode: promo ? promo.code : null,
            };

            return req.render("/dynamic/orderPage.liquid", {
              access: true,
              orderDetails,
            });
          });
        }
      }
    }else return req.render("/dynamic/panel.liquid", { access: false });
  });

  done();
};

module.exports = index;
