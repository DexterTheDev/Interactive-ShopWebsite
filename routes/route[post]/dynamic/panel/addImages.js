let PRODUCTS = require("../../../../models/products");
const { pipeline } = require("node:stream");
const util = require("node:util");
const pump = util.promisify(pipeline);
const fs = require("fs");
const path = require("path");

const index = async (fastify, options, done) => {
  fastify.post("/panel/products/:id/images", async (req, res) => {
    let username = req.session?.get("username") ?? null;
    let password = req.session?.get("password") ?? null;
    if (
      req.config.panel.username == username &&
      req.config.panel.password == password
    ) {
      const parts = req.files();
      let imgs = [];

      for await (const part of parts) {
        fs.readFile(path.join(process.cwd(), '/public') + `/productImages/${part.filename}`, (err, data) => {
          if (err == null) {
            res.send({
              access: false,
              message: `${part.filename} already exists!`,
            });
          }
        })
        imgs.push(part.filename);
        await pump(part.file, fs.createWriteStream(path.join(process.cwd(), '/public') + `/productImages/${part.filename}`));
      }

      let product = await PRODUCTS.findOne({ id: req.params.id });
      product.images = imgs;
      await product.save();
      res.send({ access: true, passImage: true, message: "Added" });
    } else res.send({ access: false });
  });

  done();
};

module.exports = index;
