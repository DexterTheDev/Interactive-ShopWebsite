const { port } = require("./config");
const fastify = require("fastify")({ logger: false });
const { Liquid } = require("liquidjs");
const path = require("path");
const { connect } = require("mongoose");

fastify.register(require("@fastify/static"), {
  root: path.join(__dirname, "public"),
  prefix: "/public/",
});

fastify.register(require('@fastify/multipart'))

const engine = new Liquid({
  root: path.join(__dirname, "components"),
  extname: ".liquid",
});

fastify.register(require("@fastify/view"), {
  engine: {
    liquid: engine,
  },
});

fastify.register(require("@fastify/secure-session"), {
  cookieName: "connect.sid",
  secret:
    "#@%#&^$^$%@$^$&%#$%@#$%$^%&$%^#$%@#$%#E%#%@$FEErfgr3g#%GT%536c53cc6%5%tv%4y4hrgrggrgrgf4n",
  cookie: {
    path: "/",
    maxAge: 86400000000,
  },
  saveUninitialized: false,
});
 

fastify.addHook("preHandler", (req, res, done) => {
  req.config = require("./config");
  req.render = async (file, data = {}, status) => {
    const baseData = {
        admin: false
    };
    await res
      .view(`/components/${file}`, Object.assign(baseData, data))
      .code(status || 200);
  };
  done();
});

fastify.setErrorHandler(async (error, request, reply) => {
    console.log(`Error occured ${error}`)
});

fastify.decorate("notFound", (request, reply) => {
  return request.render("./handlers/error.liquid", { status: 404 }, 404);
});
fastify.setNotFoundHandler(fastify.notFound);

require("./routes.json").map(async (route) => {
  await fastify.register(require(route));
});

fastify.listen({ port }, () => console.log("site is up"));
 connect(require("./config").mongodb)