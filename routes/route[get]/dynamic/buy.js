let PRODUCTS = require("../../../models/products");
let SETTINGS = require("../../../models/settings");

const index = async (fastify, options, done) => {
  fastify.get("/buy", async (req, res) => {
    let settings = await SETTINGS.findOne({ id: 'refuerzo' })
    if(!settings) settings =  await new SETTINGS({ id: 'refuerzo'}).save();
    if (!req.query.type)
      return req.render("./handlers/error.liquid", { status: 404 }, 404);
    else if (
      req.query.type == "instant" &&
      (!req.query.id || !req.query.size || !req.query.quantity)
    )
      return req.render("./handlers/error.liquid", { status: 404 }, 404);
    else if (req.query.type == "instant") {
      let product = await PRODUCTS.findOne({ id: req.query.id });
      if (!product)
        return req.render("./handlers/error.liquid", { status: 404 }, 404);
      else {
        let productPrice = (
          (product.sale > 0 ? product.sale : product.price) * Number(req.query.quantity)
        ).toLocaleString();
        let productToAdd = {
          quantity: req.query.quantity,
          size: req.query.size,
          id: product.id,
          image: product.images[0],
          name: product.name,
          description: product.description,
          price: productPrice,
          isSale: product.sale > 0 ? true : false
        };
        return req.render("/dynamic/buyPage.liquid", {
          cart: false,
          shipping: settings.shipping,
          total: eval(
            (product.sale > 0 ? product.sale : product.price) * Number(req.query.quantity) +
              Number(settings.shipping)
          ),
          products: [productToAdd],
          productID: productToAdd.id,
          quantity: productToAdd.quantity,
          size: productToAdd.size
        });
      }
    } else if (req.query.type == "cart") {
      let cart = await req.session?.get("cart");
      if (cart) {
        let toList = [];
        let total = 0;
        async function connection() {
          for (let product of cart) {
            let check = await PRODUCTS.findOne({ id: product.productID });
            if (check) {
              let productPrice =
                (check.sale > 0 ? check.sale : check.price) * Number(product.quantity);
              toList.push({
                quantity: product.quantity,
                size: product.size,
                id: product.productID,
                image: check.images[0],
                name: check.name,
                description: check.description,
                price: productPrice.toLocaleString(),
                isSale: check.sale > 0 ? true : false,
              });
              total += productPrice;
            }
          }
        }
        await connection();
        total += settings.shipping;
        return req.render("/dynamic/buyPage.liquid", {
          total,
          cart: true,
          shipping: settings.shipping,
          products: toList.sort((a, b) => parseFloat(a.quantity) - parseFloat(b.quantity)),
        });
      }
    } else return req.render("./handlers/error.liquid", { status: 404 }, 404);
  });

  done();
};

module.exports = index;
