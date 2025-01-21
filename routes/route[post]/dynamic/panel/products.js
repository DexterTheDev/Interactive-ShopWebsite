let PRODUCTS = require("../../../../models/products");

const index = async (fastify, options, done) => {
  fastify.post("/panel/products/add", async (req, res) => {
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
        let sizes = {
          xs: req.body.sizes?.xs ?? 0,
          small: req.body.sizes?.small ?? 0,
          md: req.body.sizes?.md ?? 0,
          lg: req.body.sizes?.lg ?? 0,
          xl: req.body.sizes?.xl ?? 0,
        };
        let productID = (Math.random() + 1).toString(36).substring(7);

        await new PRODUCTS({
          id: productID,
          name: req.body.name,
          price: req.body.price,
          sale: req.body?.sale ?? 0,
          sizes,
          description: req.body?.description ?? "Unknown",
        }).save();

        res.send({ access: true, message: "Added!", productID: productID });
      }
    } else res.send({ access: false });
  });

  done();
};

module.exports = index;
