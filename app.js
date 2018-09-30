import hapiAuthJWT2 from 'hapi-auth-jwt2';
import Hapi from 'hapi';
import { config } from './config/index';

//routes
import routes from './routes/routes';
import routesShops from './routes/shops';
import routesOrders from './routes/order';
import routesUser from './routes/user';

//plugins
import pluginHapiSwagger from './plugins/swagger';
import pluginHapiPagination from './plugins/hapi-pagination';
import pluginHapiAuthJWT2 from './plugins/hapi-auth-jwt2';

const server = new Hapi.Server();
console.log(config);
server.connection({
    port: config.port,
    host: config.host,
});

const init = async () => {
    await server.register([
        ...pluginHapiSwagger,
        pluginHapiPagination,
        hapiAuthJWT2
    ])
    pluginHapiAuthJWT2(server);
    server.route([
        ...routes,
        ...routesShops,
        ...routesOrders,
        ...routesUser
    ]);
    await server.start().catch((err) => console.error(err));
    console.log(`Server run on ${server.info.uri}`);
}

init();