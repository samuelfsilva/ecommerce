const { celebrate, Segments, Joi } = require('celebrate');

const Endereco = require('../models/Endereco');

module.exports = {
    verificaCad: celebrate({
        [Segments.BODY]: Joi.object().keys({
            nome: Joi.string().min(3).max(30).required(),
            cep: Joi.string().length(8).required(),
            cidade: Joi.string().min(3).max(30).required(),
            uf: Joi.string().length(2).required()
        })
    }),
    async index (request, response) {
        try {
            const endereco = await Endereco.find();
    
            return response.send({ endereco });
        } catch (err) {
            return response.status(400).send({ error: 'Erro ao carregar lista de endereços' });
        }
    },
    async create(request, response) {
        try {
            const usuario = request.headers.userid;
            const { nome, cep, cidade, uf } = request.body;
    
            const endereco = await Endereco.create({
                usuario, 
                nome,
                cep,
                cidade,
                uf
            });
            
            await endereco.save();
            
            return response.send({ endereco });
        } catch (err) {
            return response.status(400).send({ error: 'Erro ao cadastrar endereço.' });
        }
    }
}