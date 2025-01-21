let emails = require("../../../../../models/emails");

const index = async (fastify, options, done) => {
  fastify.post("/email", async (req, res) => {
    if (!req.body.email)
      return res.send({ access: false, message: "Add email to continue" });
    else {
      let email = await emails.findOne({ email: req.body.email });
      if (email)
        return res.send({ access: false, message: "Already existing email" });
      else {
        await new emails({
          email: req.body.email,
        }).save();
        res.send({ access: true, message: "Added your email to our letter" });
      }
    }
  });

  done();
};

module.exports = index;
