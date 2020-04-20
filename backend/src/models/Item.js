const mongoose = require('../database');
const bcrypt = require('bcryptjs');

const ItemSchema = new mongoose.Schema({
nome: {
    type: String,
    required: true,
},
descricao: {
    type: String,
    required: true,
},
codUsuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
},
codCategoria: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categoria',
    required: true,
},
valor: {
    type: Number,
    required: true,
},
valorAnterior: {
    type: Number,
},
imagemURI: {
    type: String,
},
ativo: {
    type: Boolean,
},
motivoExclusao: {
    type: String,
},
createdAt: {
    type: Date,
    default: Date.now,
},
});

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;