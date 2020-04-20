const mongoose = require('../database');

const FotoSchema = new mongoose.Schema({
    descricao: {
        type: String,
        required: true,
    },
    caminho: {
        type: String,
        required: true,
    },
    codItem: {
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