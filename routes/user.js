const GROUP_NAME = 'users';
// const JWT = require('jsonwebtoken');
// const config = require('../config/index')
import { config } from '../config/index'
import JWT from 'jsonwebtoken';
import Joi from 'joi';
import axios from 'axios';
import { db } from '../models';
import { decrypData } from '../untils/decrypted-data'

export default [{
    method: 'POST',
    path: `/${GROUP_NAME}/createJWT`,
    handler: async (request, replay) => {
        const generateJWT = (jwtInfo) => {
            const payload = {
                userId: jwtInfo.userId,
                exp: Math.floor(new Date().getTime() / 1000) + 7 * 24 * 60 *60,
            };
            return JWT.sign(payload, process.env.JWT_SECRET);
        };
        replay(generateJWT({
            userId: 1123123,
        }));
    },
    config: {
        tags: ['api', GROUP_NAME],
        description: '用于测试接口的JWT签发',
        auth: false,// 约定此接口不参与 JWT 的用户验证，会结合下面的 hapi-auth-jwt 来使用
    }
},
{
    method: 'POST',
    path: `/${GROUP_NAME}/wxLogin`,
    handler: async (req, reply) => {
        const appid = config.wxAppid;
        const secret = config.wxSecret;
        const { code, encryptedData, iv } = req.payload;

        const response = await axios({
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            method: 'GET',
            params: {
                appid,
                secret,
                js_code: code,
                grant_type: 'authorization_code',
            }
        });
        //response返回openid,session_key
        const { openid, session_key: sessionKey } = response.data;

        const user = await db.users.findOrCreate({
            where: {open_id: openid}
        });

        const userInfo = decrypData(encryptedData, iv, sessionKey, appid);
        console.log(userInfo);
        await db.users.update({
            nick_name: userInfo.nickName,
            avatar_url: userInfo.avatarUrl,
            gender: userInfo.gender,
            open_id: openid,
            session_key: sessionKey
        }, {
            where: {open_id: openid}
        });
        //签发jwt
        const generateJWT = (jwtInfo) => {
            const payload = {
                userId: jwtInfo.userId,
                exp: Math.floor(new Date().getTime() / 1000) + 7 * 24 * 60 *60,
            };
            return JWT.sign(payload, config.jwtSecret);
        };
        reply(generateJWT({
            userId: user[0].id,
        }));
    },
    config: {
        auth: false,
        tags: ['api', GROUP_NAME],
        validate: {
            payload: {
                code: Joi.string().required().description('用户登录的临时code'),
                encryptedData: Joi.string().required().description('用户信息edcryptedData'),
                iv: Joi.string().required().description('用户信息iv'),
            }
        }
    }
}]