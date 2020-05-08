const mongoose = require('../database');

const FotoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    tamanho: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Foto = mongoose.model('Foto', FotoSchema);

module.exports = Foto;