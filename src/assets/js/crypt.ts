import * as crypto from "crypto-js";

let key = crypto.enc.Utf8.parse('geetest_account');
export  function Encrypt(message:string){
    // key 固定为geetest_account
    // let key = crypto.enc.Utf8.parse('geetest_account');
    let ency = crypto.DES.encrypt(message,key,{
        mode: crypto.mode.ECB,
        padding: crypto.pad.Pkcs7
    });
    return ency.ciphertext.toString();
}

export interface WordArray {
    iv: string;
    salt: string;
    ciphertext: string;
    key?: string;
}

export  function Decrypt(message:string){
    let _t:string = crypto.enc.Hex.parse(message);
    let _n:WordArray = {ciphertext: _t,iv:'',salt:''};
			  let decy = crypto.DES.decrypt(
					_n, 
					key,{
					mode: crypto.mode.ECB,
					padding: crypto.pad.Pkcs7
                  })
        return decy.toString(crypto.enc.Utf8)
}