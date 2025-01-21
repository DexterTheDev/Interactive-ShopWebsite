let PROMOCODES = require("../../../models/promocodes");
const moment = require("moment");
const index = async (fastify, options, done) => {
  fastify.post("/applypromo", async (req, res) => {
    const { promo } = req.body;
    const promoCode = await PROMOCODES.findOne({ code: promo });

    if (!promoCode) {
      return res.send({ access: false, message: "Promo code does not exist" });
    }

    if (promoCode.startDate + promoCode.endDate < Date.now()) {
      return res.send({ access: false, message: "Promo code has expired" });
    }

    if (!promoCode.unlimited && promoCode.limit <= 0) {
      return res.send({ access: false, message: "Promo code limit reached" });
    }
    res.send({
      access: true,
      discount: promoCode.discount,
      message: "Promo code applied successfully",
    });
  });

  done();
};

module.exports = index;
