import{B as t}from"./p-e510fd1b.js";import{B as i,h as e,i as r}from"./p-46a018b6.js";import"./p-4bffca61.js";import"./p-94c4dcf6.js";import"./p-2d180048.js";import"./p-7ebfe9a9.js";import"./p-78d67758.js";import"./p-dd8c7f8a.js";import"./p-d7663053.js";import"./p-9b3d931a.js";import"./p-67e2a233.js";import"./p-28e84784.js";import"./p-f03d831c.js";import"./p-42947fc3.js";import"./p-c8e2e9a8.js";const s={[i.none]:"",[i.touchId]:"Touch ID",[i.faceId]:"Face ID",[i.fingerprintAuthentication]:"Fingerprint Authentication",[i.faceAuthentication]:"Face Authentication",[i.irisAuthentication]:"Iris Authentication"};class o extends t{constructor(){super(...arguments),this.biometryType=i.none}async checkBiometry(){return Promise.resolve({isAvailable:this.biometryType!==i.none,biometryType:this.biometryType,reason:"",code:e.none})}async authenticate(t){return this.checkBiometry().then((({isAvailable:i,biometryType:o})=>{if(i){if(confirm((null==t?void 0:t.reason)||`Authenticate with ${p=o,s[p]||""}?`))return;throw new r("User cancelled",e.userCancel)}var p;throw new r("Biometry not available",e.biometryNotAvailable)}))}async setBiometryType(t){return void 0===t||("string"==typeof t?i.hasOwnProperty(t)&&(this.biometryType=i[t]):this.biometryType=t),Promise.resolve()}}export{o as BiometricAuthWeb}