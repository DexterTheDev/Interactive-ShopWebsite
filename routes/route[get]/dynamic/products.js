let PRODUCTS = require("../../../models/products");

const index = async (fastify, options, done) => {
  fastify.get("/products", async (req, res) => {
    let products = [];
    (await PRODUCTS.find()).map((product) => {
      products.push({
        id: product.id,
        image: product.images[0],
        name: product.name,
        description: product.description,
        price: product.price.toLocaleString(),
        sale: product?.sale?.toLocaleString() ?? 0,
        sizes: product.sizes,
      });
    });
    return req.render("/dynamic/products.liquid", {
      products,
    });
  });

  done();
};

module.exports = index;
