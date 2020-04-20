const mongoose = require('../database');

const CategoriaSchema = new mongoose.Schema({
valor: {
    type: Number,
    required: true,
},
createdAt: {
    type: Date,
    default: Date.now,
},
});

const Categoria = mongoose.model('Categoria', CategoriaSchema);

module.exports = Categoria;