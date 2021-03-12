import Crypto from "crypto";
const algorithm = 'aes-256-cbc';

const dataDecrypt = function (text) {
    let iv = Buffer.from(text.iv, 'base64');
    let key = Buffer.from(text.key, 'base64');
    let encryptedText = Buffer.from(text.data, 'base64');
    let decipher = Crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

const dataEncrypt = (text, iv, key, r) => {
    let ivx = Buffer.from(iv, 'base64');
    let keyy = Buffer.from(key, 'base64');
    let cipher = Crypto.createCipheriv('aes-256-cbc', keyy, ivx);
    let enc = cipher.update(text);
    let encrypted = Buffer.concat([enc, cipher.final()]);
    if (r) return { iv: ivx.toString('base64'), data: encrypted.toString('base64'), key: keyy.toString('base64') };
    else return encrypted.toString('base64');
}

const genPassword = (text) => {
    ///creating hmac object 
    var hmac = Crypto.createHmac('md5', 'Hdlive@123');
    //passing the data to be hashed
    var data = hmac.update(text);
    //Creating the hmac in the required format
    var gen_hmac = data.digest('hex');
    //Printing the output on the console
    //console.log("hmac : " + gen_hmac);
    return gen_hmac.toString();
}

const apiURL = () => {
    return "http://139.59.16.245:3020/api/";
}

export { dataEncrypt, dataDecrypt, genPassword, apiURL };
