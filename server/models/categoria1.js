const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const usuario = require('./usuario');

// let rolesValidos = {
//     values: ['ADMIN_ROLE', 'USER_ROLE', 'SUPER_ROLE'],
//     message: '{VALUE} no es un rol valido'
// }

let Schema = mongoose.Schema;

let categoriaSchema = new Schema({
    descripcion: {
        type: String,
        required: [true, 'La descripcion es necesario']
    },

    usuario: {
        type: String,
        required: [true, 'El usuario es necesario']
    },

});

// usuarioSchema.methods.toJSON = function() {

//     let user = this;
//     let userObject = user.toObject();
//     delete userObject.password;

//     return userObject;
// }

categoriaSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser unico' });

module.exports = mongoose.model('Categoria', categoriaSchema);