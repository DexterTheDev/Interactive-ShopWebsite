let ORDERS = require("../../../models/orders");
let PRODUCTS = require("../../../models/products");

const index = async (fastify, options, done) => {
  fastify.get("/trackorder", async (req, res) => {
    if (req.query.email) {
      let Orders = [];
      function connection() {
        return new Promise(async function (resolve, reject) {
          let orders = await ORDERS.find({ email: req.query.email });
          if(orders.length < 1) return resolve();
          orders.map((order) => {
            if (order) {
              order.products.map(async (or) => {
                let check = await PRODUCTS.findOne({ id: or.productID });
                if (!check) return;
                Orders.push({
                  orderID: order.id,
                  firstname: order.firstname,
                  lastname: order.lastname,
                  name: check.name,
                  price: check.price * or.quantity,
                  size: or.size,
                  quantity: or.quantity,
                  image: or.image,
                });
                resolve();
              });
            } else resolve();
          });
        });
      }
      await connection().then(async (res) => {
        return req.render("/dynamic/trackOrder.liquid", {
          Order: true,
          Orders,
        });
      });
    } else return req.render("/dynamic/trackOrder.liquid", { Order: false });
  });

  done();
};

module.exports = index;
