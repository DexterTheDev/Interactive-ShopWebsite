let orders = require("../../../../../models/orders");

const index = async (fastify, options, done) => {
  fastify.post("/clearcart", async (req, res) => {
    req.session?.delete("cart");
    res.send({ access: true });
  });

  done();
};

module.exports = index;
