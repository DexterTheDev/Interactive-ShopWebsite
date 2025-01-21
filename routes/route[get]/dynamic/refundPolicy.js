const index = async (fastify, options, done) => {
    fastify.get("/refundpolicy", async (req, res) => {
      return req.render("/dynamic/refundPolicy.liquid");
    });
  
    done();
  };
  
  module.exports = index;
  