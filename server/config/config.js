//=============================
// pruerto
//=============================

process.env.PORT = process.env.PORT || 3000;

//=============================
// entorno
//=============================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'


//=============================
// base de datos
//=============================

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URL;
}

process.env.URLDB = urlDB;


//=============================
// vencimiento del token
//=============================

//process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;
process.env.CADUCIDAD_TOKEN = '48h';


//=============================
// seed del token
//=============================

process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

//=============================
// google client
//=============================

process.env.CLIENT_ID = process.env.CLIENT_ID || '886926509730-mpssb1d045thlmunk8nn645879modpho.apps.googleusercontent.com'