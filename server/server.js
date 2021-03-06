require('./config/config');

const mongoose = require('mongoose');
const express = require('express');

const path = require('path');

const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// publicar pantalla index.html
app.use(express.static(path.resolve(__dirname, '../public')));

app.use(require('./routes/index'));


mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    (err, res) => {

        if (err) throw err;

        console.log('Base de Datos ONLINE');

    });


app.listen(process.env.PORT, () => {
    console.log('Escuchando en el puerot: ', process.env.PORT);
});