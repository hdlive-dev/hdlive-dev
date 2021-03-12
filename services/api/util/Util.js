const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
module.exports = {
    getDynamicIV: () => {
        let iv = crypto.randomBytes(16);
        return iv.toString('base64');
    },
    getDynamicKey: () => {
        let keyy = crypto.randomBytes(32);
        return keyy.toString('base64');
    },
    dataEncrypt: (text, iv, key, r) => {
        let ivx = Buffer.from(iv, 'base64');
        let keyy = Buffer.from(key, 'base64');
        // let ivx = "a";
        // let keyy = "a";
        let cipher = crypto.createCipheriv('aes-256-cbc', keyy, ivx);
        let enc = cipher.update(text);
        let encrypted = Buffer.concat([enc, cipher.final()]);
        if (r) return { iv: ivx.toString('base64'), data: encrypted.toString('base64'), key: keyy.toString('base64') };
        else return encrypted.toString('base64');
    },
    dataDecrypt: (text) => {
        let iv = Buffer.from(text.iv, 'base64');
        let key = Buffer.from(text.key, 'base64');
        let encryptedText = Buffer.from(text.data, 'base64');
        let decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    },
};
