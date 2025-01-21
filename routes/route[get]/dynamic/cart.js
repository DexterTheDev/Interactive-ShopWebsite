let PRODUCTS = require("../../../models/products");

const index = async (fastify, options, done) => {
  fastify.get("/cart", async (req, res) => {
    let cart = await req.session?.get("cart");
    if (cart) {
      let toList = [];
      function connection() {
        return new Promise(async function (resolve, reject) {
          if(cart.length <1) return resolve();
          cart.map(async (product) => {
            let check = await PRODUCTS.findOne({ id: product.productID });
            if (!check) return;
            else {
              toList.push({
                image: check.images[0],
                id: check.id,
                name: check.name,
                size: product.size,
                quantity: product.quantity,
                price: (product.quantity * (check.sale > 0 ? check.sale : check.price)).toLocaleString(),
                isSale: check.sale > 0 ? true : false
              });
              resolve();
            }
          });
        });
      }
      await connection().then(async (res) => {
        return req.render("/dynamic/cart.liquid", {
          access: true,
          products: toList.sort(function (a, b) {
            return parseFloat(a.quantity) - parseFloat(b.quantity);
          }),
        });
      });
    }
    return req.render("/dynamic/cart.liquid", {
      access: true,
      products: [],
    });
  });

  done();
};

module.exports = index;
