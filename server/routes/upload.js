const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

const Producto = require('../models/producto');
const Usuario = require('../models/usuario');
const fs = require('fs');
const path = require('path');


// default options
app.use(fileUpload());

app.put('/upload/:tipo/:id', function(req, res) {

    let tipo = req.params.tipo;
    let id = req.params.id;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: "No se ha indicado ningun archivo"
            }
        });

    }

    //validar tipos

    let tiposValidos = ['productos', 'usuarios'];

    if (tiposValidos.indexOf(tipo) < 0) {

        return res.status(400).json({
            ok: false,
            err: {
                message: 'los tipos validas son: ' + tiposValidos.join(', ')
            }
        })

    }

    let archivo = req.files.archivo;
    let nombreArchivo = archivo.name.split('.');
    let extencion = nombreArchivo[nombreArchivo.length - 1];

    //extenciones validas
    let extencioneValidad = ['png', 'jpg', 'git', 'jpge'];

    if (extencioneValidad.indexOf(extencion) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'las extenciones validas son: ' + extencioneValidad.join(', ')
            }
        })
    }

    //armar el nombre del archivo
    let nombreFile = `${id}-${ new Date().getMilliseconds()}.${extencion}`;

    archivo.mv(`uploads/${tipo}/${nombreFile}`, (err) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (tipo === 'usuarios') {
            imagenUsuario(id, res, nombreFile);
        } else {
            imagenProducto(id, res, nombreFile);
        }
    });

});

function imagenUsuario(id, res, nombreFile) {

    Usuario.findById(id, (err, usuarioDB) => {

        if (err) {
            borraArchivo(nombreFile, 'usuarios');
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!usuarioDB) {

            borraArchivo(nombreFile, 'usuarios');

            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Id no encontrado -1 '
                }
            });
        }

        borraArchivo(usuarioDB.img, 'usuarios');

        usuarioDB.img = nombreFile;

        usuarioDB.save((err, usuarioGuardado) => {

            res.json({
                ok: true,
                usuario: usuarioGuardado,
                img: nombreFile
            });

        });

    });
}

function imagenProducto(id, res, nombreFile) {

    Producto.findById(id, (err, productoDB) => {

        if (err) {
            borraArchivo(nombreFile, 'productos');
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {

            borraArchivo(nombreFile, 'productos');

            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Id no encontrado -2 '
                }
            });
        }

        borraArchivo(productoDB.img, 'productos');

        productoDB.img = nombreFile;

        console.log(productoDB);

        productoDB.save((err, productoGuardado) => {

            res.json({
                ok: true,
                producto: productoGuardado,
                img: nombreFile
            });

        });

    });

}


function borraArchivo(nombreImagen, tipo) {

    let pathImagen = path.resolve(__dirname, `../../uploads/${tipo}/${nombreImagen}`);

    if (fs.existsSync(pathImagen)) {
        fs.unlinkSync(pathImagen);
    }

}

module.exports = app;