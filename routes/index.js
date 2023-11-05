const express = require('express');


const productsRouter = require('./products.router');
const usersRouter = require('./users.router');
const categoriesRouter = require('./categories.router');

//Recordatorio de que este index.js esta dentro de la carpeta de routes y no es el principal. Aqui solo distribuye las diferentes rutas en sus respectivos archivos

function routerApi(app) {

  const router = express.Router();
  app.use('/api/v1', router); //path global. En caso de que haya otras versiones es recomendable usar otro index.js para manejar diferentes versiones

  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
  router.use('/categories', categoriesRouter);
}

module.exports = routerApi;
