let PRODUCTS = require("../../../../models/products");

const index = async (fastify, options, done) => {
  fastify.post("/panel/products/:id/modify", async (req, res) => {
    let username = req.session?.get("username") ?? null;
    let password = req.session?.get("password") ?? null;
    if (
      req.config.panel.username == username &&
      req.config.panel.password == password
    ) {
      if (!req.body?.name || !req.body?.price)
        res.send({
          access: false,
          message: "Make sure to fill the price & name & images",
        });
      else {
        let product = await PRODUCTS.findOne({ id: req.params.id });
        if (!product)
          return res.send({
            access: false,
            message: "Refresh this page please! (Product doesn't exists)",
          });

        let sizes = {
          xs: req.body.sizes?.xs ?? 0,
          small: req.body.sizes?.small ?? 0,
          md: req.body.sizes?.md ?? 0,
          lg: req.body.sizes?.lg ?? 0,
          xl: req.body.sizes?.xl ?? 0,
        };

        (product.name = req.body.name),
          (product.price = req.body.price),
          (product.sale = req.body?.sale ?? 0),
          (product.sizes = sizes),
          (product.description = req.body?.description ?? "Unknown"),
          await product.save();

        res.send({ access: true, message: "Modified!" });
      }
    } else res.send({ access: false });
  });

  done();
};

module.exports = index;
