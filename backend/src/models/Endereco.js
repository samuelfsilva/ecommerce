const mongoose = require('../database');

const EnderecoSchema = new mongoose.Schema({
nome: {
    type: String,
    required: true,
},
cep: {
    type: String,
    required: true,
},
cidade: {
    type: String,
    required: true,
},
uf: {
    type: String,
    required: true,
},
usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
},
createdAt: {
    type: Date,
    default: Date.now,
},
});

const Endereco = mongoose.model('Endereco', EnderecoSchema);

module.exports = Endereco;