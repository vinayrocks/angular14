import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RdEncryptDecryptService {
  API_Key:string;
  constructor() { 
    this.API_Key=environment.API_key;
  }

  ecryptModel(data:any){
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        data[key]=this.set(data[key]);
       
      }
    }
    return data; 
  }
  decryptModel(data:any){
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        data[key]=this.get(data[key]);
      }
    }
    return data; 
  }

  set(value){
    // console.log(this.API_Key);
    var key = CryptoJS.enc.Utf8.parse(this.API_Key);
    var iv = CryptoJS.enc.Utf8.parse(this.API_Key);
    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()), key,
    {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return encrypted.toString();
  }

  //The get method is use for decrypt the value.
  get(value){
    var key = CryptoJS.enc.Utf8.parse(this.API_Key);
    var iv = CryptoJS.enc.Utf8.parse(this.API_Key);
    var decrypted = CryptoJS.AES.decrypt(value, key, {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}
