const fs = require('fs');
//require('dotenv').config();

//const environment = process.env.ENVIRONMENT;

//let isProduction : boolean = true;
let targetPath = './src/environments/environment.ts';

// if (environment == "Production"){
//    isProduction = true;
//   // targetPath = './src/environments/environment.prod.ts';
// }
console.log(JSON.stringify(process.env));

const API_KEY = process.env.API_KEY || "";
const AUTH_DOMAIN = process.env.AUTH_DOMAIN || "";
const DATABASE_URL = process.env.DATABASE_URL || "";
const PROJECT_ID = process.env.PROJECT_ID || "";
const STORAGE_BUCKET = process.env.STORAGE_BUCKET || "";
const MESSAGING_SENDER_ID = process.env.MESSAGING_SENDER_ID || "";
const APP_ID = process.env.APP_ID || "";
const API_HOST = process.env.API_HOST || "";
const API_HOST_PORT = process.env.API_HOST_PORT || "";

//Correos
const USER_AD_1 = process.env.USER_AD_1 || "";
const USER_AD_2 = process.env.USER_AD_2 || "";

const envConfigFile = `
  export const environment = {
      production: true,
      firebaseConfig : {
        apiKey: "${API_KEY}",
        authDomain: "${AUTH_DOMAIN}",
        projectId: "${PROJECT_ID}",
        storageBucket: "${STORAGE_BUCKET}",
        messagingSenderId: "${MESSAGING_SENDER_ID}",
        appId: "${APP_ID}",    
      },
      apiHost: "${API_HOST}",
      apiHostPort: "${API_HOST_PORT}",
      adminUsers : {
        devbryansank: "${USER_AD_1}",
        agarcia: "${USER_AD_2}",
      }
    };   
`
fs.writeFile(targetPath, envConfigFile, function(err){
    if (err)
        console.log(err);

//    if (environment == "Production"){
      targetPath = './src/environments/environment.prod.ts';
      fs.writeFile(targetPath, envConfigFile, function(err){
        if (err)
          console.log(err);
      });
    //}
})