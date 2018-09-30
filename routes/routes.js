import { jwtHeaderDefine } from '../untils/router-helper';
export default [
    {
        method: "GET",
        path: "/",
        handler: (request, reply) => {
            console.log(request.auth.credentials);
            reply("Hello, World");
        },
        config: {
            tags: ['api', 'tests'],
            description: "这是测试",
            validate: {
                ...jwtHeaderDefine
            }
        }
    }
]