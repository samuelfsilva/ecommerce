const { celebrate, Segments, Joi } = require('celebrate');

const Item = require('../models/Item');
const HistoricoValor = require('../models/HistoricoValor');
//const generateUniqueId = require('../utils/generateUniqueId');

module.exports = {
    verificaCad: celebrate({
        [Segments.HEADERS]: Joi.object({
            userid: Joi.string().required(),
        }).unknown(),
        [Segments.BODY]: Joi.object().keys({
            nome: Joi.string().required(),
            descricao: Joi.string().required(),
            valor: Joi.number().required(),
            categoria: Joi.string().required(),
            ativo: Joi.boolean().required()
        })
    }),
    async index (request, response) {
        try {
            const items = await Item.find().populate(['usuario','categoria']);
            
            return response.status(200).send({ items });
        } catch (err) {
            console.log(err);
            return response.status(400).send({ error: 'Erro ao carregar lista de itens' });
        }
    },
    async create(request, response) {
        try {
            const userId = request.headers.userid;
            const { nome, descricao, valor, categoria } = request.body;
            
            const item = await Item.create({ 
                nome, 
                descricao,
                usuario: userId,
                categoria
            });
            
            await item.save();

            const historicoValor = await HistoricoValor.create({
                item: item._id,
                valor
            });

            await historicoValor.save();
    
            return response.status(200).send({ item });
        } catch (err) {
            return response.status(400).send({ error: 'Erro ao criar um item' });
        }
    },
    async updateValor(request, response) {
        try {
            const userId = request.params.userId;
            const { itemId, valor } = request.body;

            const item = Item.find({ _id: itemId, usuario: userId });

            if (item) {
                const historicoValor = await HistoricoValor.create({
                    item: itemId,
                    valor
                });
    
                await historicoValor.save();
        
                return response.status(200).send({ historicoValor });
            } else {
                return response.status(400).send({ error: 'Nenhum item foi encontrado para este usuário' });
            }
        } catch (err) {
            return response.status(400).send({ error: 'Erro ao atualizar o valor' });
        }
    },
}