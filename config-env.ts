const fs = require('fs');
require('dotenv').config();

const environment = process.env.ENVIRONMENT;

let isProduction : boolean = true;
let targetPath = './src/environments/environment.ts';

// if (environment == "Production"){
//   isProduction = true;
//   targetPath = './src/environments/environment.prod.ts';
// }

// const API_KEY = process.env.API_KEY;
// const AUTH_DOMAIN = process.env.AUTH_DOMAIN;
// const DATABASE_URL = process.env.DATABASE_URL;
// const PROJECT_ID = process.env.PROJECT_ID;
// const STORAGE_BUCKET = process.env.STORAGE_BUCKET;
// const MESSAGING_SENDER_ID = process.env.MESSAGING_SENDER_ID;
// const APP_ID = process.env.APP_ID;


const envConfigFile = `
  export const environment = {
      production: ${isProduction},
      firebaseConfig : {
        apiKey: "",
        authDomain: "",
        projectId: "",
        storageBucket: "",
        messagingSenderId: "",
        appId: "",    
      },
      apiHost: "",
      apiHostPort: ""
    };   
`
fs.writeFile(targetPath, envConfigFile, function(err){
    if (err)
        console.log(err);
})

