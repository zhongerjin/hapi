const GROUP_NAME = 'orders';
import Joi from 'joi';
import { jwtHeaderDefine } from '../untils/router-helper';

export default [
  {
    method: 'POST',
    path: `/${GROUP_NAME}`,
    handler: async (request, reply) => {
      reply();
    },
    config: {
      tags: ['api', GROUP_NAME],
      description: '创建订单',
      validate: {
          payload: {
              goodsList: Joi.array().items(
                  Joi.object().keys({
                      goods_id: Joi.number().integer(),
                      count: Joi.number().integer(),
                  }),
              ),
          },
          ...jwtHeaderDefine,
        },
    },
  },
  {
    method: 'POST',
    path: `/${GROUP_NAME}/{orderId}/pay`,
    handler: async (request, reply) => {
      reply();
    },
    config: {
        tags: ['api', GROUP_NAME],
        description: '支付某条订单',
        validate: {
            params: {
                orderId: Joi.number().min(3).required().error(new Error('fucking'))
            }
        }
    },
  },
];