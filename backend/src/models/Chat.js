const mongoose = require('../database');

const ChatSchema = new mongoose.Schema({
    mensagem: {
        type: String,
        required: true,
    },
    codUsuarioItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    },
    codUsuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
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

const Chat = mongoose.model('Chat', ChatSchema);

module.exports = Chat;