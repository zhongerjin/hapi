import inert from 'inert';
import vision from 'vision';
import packages from 'package';
import hapiSwagger from 'hapi-swagger';

export default [
    inert,
    vision,
    {
        register: hapiSwagger,
        options: {
            info: {
                title: '接口文档',
                version: packages.version,
            },
            grouping: "tags",
            tags: [
                {name: 'tests', description: '测试相关'},
            ]
        }
    }
]