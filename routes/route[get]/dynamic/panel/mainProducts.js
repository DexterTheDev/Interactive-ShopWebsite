let PRODUCTS = require("../../../../models/products");

const index = async (fastify, options, done) => {
  fastify.get("/refuerzo/panel/products", async (req, res) => {
    let username = req.session?.get("username") ?? null;
    let password = req.session?.get("password") ?? null;
    if (
      req.config.panel.username == username &&
      req.config.panel.password == password
    ) {
      let products = [];
      (await PRODUCTS.find()).map((product) => {
        products.push({
          id: product.id,
          image: product.images[0],
          name: product.name,
          description: product.description,
          price: product.price.toLocaleString(),
          sizes: product.sizes
        });
      });
      return req.render("/dynamic/panel/index.liquid", {
        access: true,
        products,
      });
    }
    return req.render("/dynamic/panel.liquid", { access: false });
  });

  done();
};

module.exports = index;
