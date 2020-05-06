const express = require('express');

const ItemController = require('./controllers/ItemController');
const UsuarioController = require('./controllers/UsuarioController');
const EnderecoController = require('./controllers/EnderecoController');
const CategoriaController = require('./controllers/CategoriaController');

const routes = express.Router();

routes.get('/', function(request, response) {
    return response.send('API está funcionando.');
});
/*
    DADOS PESSOAIS
*/
routes.get('/user', UsuarioController.index);

routes.post('/user', UsuarioController.verificaCad, UsuarioController.create);

routes.post('/address', EnderecoController.verificaCad, EnderecoController.create);
/*
    PRODUTOS
*/
routes.get('/item', ItemController.index);

routes.post('/item', ItemController.verificaCad, ItemController.create);

routes.put('/item/:itemId', ItemController.verificaUpdate, ItemController.update);

routes.get('/category', CategoriaController.index);

routes.post('/category', CategoriaController.verificaCad, CategoriaController.create);



/* routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), ProfileController.index); */

/* routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}), IncidentController.index);

routes.post('/incidents', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required(),
    }),
}), IncidentController.create);

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), IncidentController.delete); */

module.exports = routes;