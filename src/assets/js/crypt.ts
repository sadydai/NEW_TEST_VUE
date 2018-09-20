import * as crypto from 'crypto-js';

const key = crypto.enc.Utf8.parse('geetest_account');
export function Encrypt(message:string) {
    // key 固定为geetest_account
    // let key = crypto.enc.Utf8.parse('geetest_account');
    const ency = crypto.DES.encrypt(message, key, {
        mode: crypto.mode.ECB,
        padding: crypto.pad.Pkcs7,
    });
    return ency.ciphertext.toString();
}

export interface WordArray {
    iv: string;
    salt: string;
    ciphertext: string;
    key?: string;
}

export function Decrypt(message:string) {
    const t:string = crypto.enc.Hex.parse(message);
    const n:WordArray = { ciphertext: t, iv: '', salt: '' };
    const decy = crypto.DES.decrypt(n, key, {
        mode: crypto.mode.ECB,
        padding: crypto.pad.Pkcs7,
    });
    return decy.toString(crypto.enc.Utf8);
}
