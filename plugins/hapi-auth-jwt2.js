// import config from '../config/index';
// const config = require('../config/index');
import { config } from '../config/index';

const validate = (decoded, request, callback) => {
    let error;
    const { userId } = decoded;

    if(!userId){
        return callback(error, false, userId);
    }
    const credentials = {
        userId,
    };
    return callback(error, true, credentials);
};

export default (server) => {
    server.auth.strategy('jwt', 'jwt', {
        key: config.jwtSecret,
        validateFunc: validate,
    });
    server.auth.default('jwt');
}