import * as crypto from 'crypto';
// const crypto = require('crypto');

const decrypData = (encryptedData, iv, sessionKey, appid) => {
    const encryptedDataNew = Buffer.from(encryptedData, 'base64');
    const ivNew = Buffer.from(iv, 'base64');
    const sessionKeyNew = Buffer.from(sessionKey, 'base64');

    let decoded = '';
    try{
        //解密,aes-128-cbc
        const decipher = crypto.createDecipheriv('aes-128-cbc', sessionKeyNew, ivNew);
        // 设置自动 padding 为 true，删除填充补位
        decipher.setAutoPadding(true);
        decoded = decipher.update(encryptedDataNew, 'binary', 'utf8');
        decoded += decipher.final('utf8');
        decoded = JSON.parse(decoded);
    }catch (err){
        console.err(err);
        throw new Error('Illegal Buffer');
    }

    if(decoded.watermark.appid !== appid){
        throw new Error('Illegal Buffer')
    }

    return decoded
}

export {decrypData}