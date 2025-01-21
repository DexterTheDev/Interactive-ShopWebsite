let PRODUCTS = require("../../../models/products");

const index = async (fastify, options, done) => {
  fastify.get("/products/:id", async (req, res) => {
    let product = await PRODUCTS.findOne({ id: req.params.id });
    
    if (!product) return req.render("./handlers/error.liquid", { status: 404 }, 404);
    else {
      return req.render("/dynamic/productPage.liquid", {
        product: {
          id: product.id,
          image: product.images[0],
          images: product.images,
          name: product.name,
          description: product.description,
          price: product.price.toLocaleString(),
          sale: product.sale?.toLocaleString() ?? 0,
          sizes: {
            xs: product.sizes["xs"] == "" ? 0 : product.sizes["xs"],
            s: product.sizes["small"] == "" ? 0 : product.sizes["small"],
            md: product.sizes["md"] == "" ? 0 : product.sizes["md"],
            l: product.sizes["lg"] == "" ? 0 : product.sizes["lg"],
            xl: product.sizes["xl"] == "" ? 0 : product.sizes["xl"],
          },
        },
      });
    }
  });

  done();
};

module.exports = index;
