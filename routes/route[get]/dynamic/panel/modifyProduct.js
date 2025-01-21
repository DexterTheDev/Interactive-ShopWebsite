let PRODUCTS = require("../../../../models/products");

const index = async (fastify, options, done) => {
  fastify.get("/refuerzo/panel/products/:id/modify", async (req, res) => {
    let username = req.session?.get("username") ?? null;
    let password = req.session?.get("password") ?? null;
    if (
      req.config.panel.username == username &&
      req.config.panel.password == password
    ) {
        let product = await PRODUCTS.findOne({ id: req.params.id });
        if(!product) return req.render("./handlers/error.liquid", { status: 404 }, 404);
        else {
            
            return req.render("/dynamic/panel/modifyProduct.liquid", {
                access: true,
                product: {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    sale: product.sale,
                    sizes: product.sizes,
                    description: product.description
                }
              });
        }
    }
    return req.render("/dynamic/panel.liquid", { access: false });
  });

  done();
};

module.exports = index;
