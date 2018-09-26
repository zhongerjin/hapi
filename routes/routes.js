module.exports = [
    {
        method: "GET",
        path: "/",
        handler: (request, reply) => {
            reply("Hello, World");
        },
        config: {
            tags: ['api', 'tests'],
            description: "这是测试"
        }
    }
]