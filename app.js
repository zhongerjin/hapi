require('env2')('./.env');
const Hapi = require("hapi");
const config = require("./config/index");
const routes = require("./routes/routes");
const routesShops = require("./routes/shops");
const routesOrders = require("./routes/order");
const pluginHapiSwagger = require("./plugins/swagger");

const server = new Hapi.Server();
server.connection({
    port: config.port,
    host: config.host,
});

const init = async () => {
    await server.register([
        ...pluginHapiSwagger,
    ])
    server.route([
        ...routes,
        ...routesShops,
        ...routesOrders
    ]);
    await server.start();
    console.log(`Server run on ${server.info.uri}`);
}

init();