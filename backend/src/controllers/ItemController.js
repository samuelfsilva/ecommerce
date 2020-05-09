const { celebrate, Segments, Joi } = require('celebrate');
const multer = require("multer");

const multerConfig = require("./../config/multer");

const Item = require('../models/Item');
const HistoricoValor = require('../models/HistoricoValor');
const Foto = require('../models/Foto');

module.exports = {
    verificaCad: celebrate({
        [Segments.HEADERS]: Joi.object({
            userid: Joi.string().required(),
        }).unknown(),
        [Segments.BODY]: Joi.object().keys({
            nome: Joi.string().required(),
            descricao: Joi.string().required(),
            valor: Joi.number().positive().required(),
            categoria: Joi.string().required(),
            ativo: Joi.boolean().required()
        })
    }),
    verificaUpdate: celebrate({
        [Segments.HEADERS]: Joi.object({
            userid: Joi.string().required(),
        }).unknown(),
        [Segments.BODY]: Joi.object().keys({
            nome: Joi.string().required(),
            descricao: Joi.string().required(),
            valor: Joi.number().positive().required(),
            categoria: Joi.string().required()
        })
    }),
    verificaFind: celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            itemId: Joi.string().required().length(24).regex(/^[0-9a-fA-F]+$/),
        })
    }),
    imageMulter: multer(multerConfig).single("file"),
    async index (request, response) {
        try {
            const items = await Item.find().populate(['usuario','categoria']);
            
            return response.status(200).send({ items });
        } catch (err) {
            console.log(err);
            return response.status(400).send({ error: 'Erro ao carregar lista de itens' });
        }
    },
    async find (request, response) {
        try {
            const itemId = request.params.itemId;
            const item = await Item.find({ _id: itemId }).populate(['usuario','categoria']);
            
            return response.status(200).send({ item });
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
    async update(request, response) {
        try {
            const userId = request.headers.userid;
            const itemId = request.params.itemId;

            const { nome, descricao, valor, categoria } = request.body;

            const itemSearch = Item.find({ _id: itemId, usuario: userId });

            if (itemSearch) {
                const item = await Item.findByIdAndUpdate(itemId, { 
                    nome, 
                    descricao,
                    categoria
                });

                await item.save();

                const historicoValor = await HistoricoValor.create({
                    item: itemId,
                    valor
                });

                await historicoValor.save();
        
                return response.status(200).send({ item });
            } else {
                return response.status(400).send({ error: 'Nenhum item foi encontrado para este usuário' });
            }
        } catch (err) {
            return response.status(400).send({ error: 'Erro ao atualizar o item ' });
        }
    },
    async insertImagem(request, response) {
        const { originalname: nome, size: tamanho, key, location: url = "" } = request.file;
        const item = request.params.itemId;

        const foto = await Foto.create({
            nome,
            tamanho,
            url,
            item
        });

        return response.json(foto);
    },
}