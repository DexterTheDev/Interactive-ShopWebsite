const index = async (fastify, options, done) => {
    fastify.get("/policy", async (req, res) => {
      return req.render("/dynamic/policy.liquid");
    });
  
    done();
  };
  
  module.exports = index;
  