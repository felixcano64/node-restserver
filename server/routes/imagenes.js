const express = require('express');
const fs = require('fs');
const path = require('path');

const Producto = require('../models/producto');
const Usuario = require('../models/usuario');

const fileUpload = require('express-fileupload');
const app = express();

const { verificaTokenImg } = require('../middlewares/autenticacion');

app.get('/imagenes/:tipo/:img', verificaTokenImg, (req, res) => {

    let tipo = req.params.tipo;
    let img = req.params.img;

    let pathImagen = path.resolve(__dirname, `../../uploads/${tipo}/${img}`);

    if (fs.existsSync(pathImagen)) {
        res.sendFile(pathImagen);

    } else {
        let noimagenPath = path.resolve(__dirname, '../assets/img_nofound.png');
        res.sendFile(noimagenPath);

    }



});





module.exports = app;