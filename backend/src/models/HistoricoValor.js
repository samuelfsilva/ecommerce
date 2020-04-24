const mongoose = require('../database');

const HistoricoValorSchema = new mongoose.Schema({
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
    },
    valor: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const HistoricoValor = mongoose.model('HistoricoValor', HistoricoValorSchema);

module.exports = HistoricoValor;