const GROUP_NAME = 'shops';
// const Joi = require('joi');
// const models = require('../models');
// const { paginationDefine } = require('../untils/router-helper');
import Joi from 'joi';
import { db } from '../models';
import { paginationDefine } from '../untils/router-helper';
export default [
    {
        method: 'GET',
        path: `/${GROUP_NAME}`,
        handler: async (request, reply) => {
            const {rows: results, cont: totalCount} = await db.shops.findAndCountAll({
                attributes:[
                    'id','name'
                ],
                limit: request.query.limit,
                offset: (request.query.page - 1) * request.query.limit,
            })
            reply({results, totalCount});
        },
        config: {
            tags: ['api', GROUP_NAME],
            auth: false,
            description: '获取店铺列表',
            validate: {
                query: {
                    ...paginationDefine
                }
            }
        },
    },
    {
        method: 'GET',
        path: `/${GROUP_NAME}/{shopId}/goods`,
        handler: async (request, reply) => {
            const {rows: results, count: totalCount} = await db.shops.findAndCountAll({
                where: {
                    id: request.params.shopId,
                },
                attributes: [
                    'id',
                    'name'
                ],
                limit: request.query.limit,
                offset: (request.query.page - 1) * request.query.limit,
            })
            reply({results, totalCount});
        },
        config: {
            tags: ['api', GROUP_NAME],
            auth: false,
            description: '获取店铺的商品列表',
            validate: {
                params: {
                    shopId: Joi.string().required().description('店铺id'),
                },
                query: {
                    ...paginationDefine
                }
            }
        },
    },
]