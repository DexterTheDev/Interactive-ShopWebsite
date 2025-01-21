const PROMOCODES = require("../../../../models/promocodes");

const index = async (fastify, options, done) => {
  fastify.post("/panel/promos/add", async (req, res) => {
    let username = req.session?.get("username") ?? null;
    let password = req.session?.get("password") ?? null;
    if (
      req.config.panel.username == username &&
      req.config.panel.password == password
    ) {
      const { promoCode, discount, limit, unlimited, date } = req.body;

      const ms = require("ms");

      const dateInMs = ms(date);
      if (isNaN(dateInMs)) {
        return res.send({
          access: false,
          message: "End Date must be a valid duration",
        });
      }

      if (isNaN(discount)) {
        return res.send({
          access: false,
          message: "Discount must be a number",
        });
      }
      if (isNaN(limit)) {
        return res.send({ access: false, message: "Limit must be a number" });
      }

      const newPromo = new PROMOCODES({
        code: promoCode,
        discount,
        limit,
        unlimited,
        endDate: dateInMs,
      });
      try {
        await newPromo.save();
        res.send({ access: true, message: "Promo code added successfully" });
      } catch (err) {
        res.send({ access: false, message: err.message });
      }
    } else res.send({ access: false });
  });

  done();
};

module.exports = index;
