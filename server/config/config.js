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

if (process.env.NODE_ENV === 'xev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    //urlDB = 'mongodb://localhost:27017/cafe';
    urlDB = 'mongodb+srv://jorlaf:9Bot2j3XtAazIoUV@cluster0.9axsh.mongodb.net/cafe';
}

process.env.URLDB = urlDB;