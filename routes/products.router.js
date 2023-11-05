const express = require('express');
const ProductsService = require('./../services/product.service');
const validatorHandler = require('./../middlewares/validator.handler');
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
} = require('./../schemas/product.schema');

const router = express.Router();
const service = new ProductsService();

router.get('/', async (req, res) => {
  const products = await service.find();

  res.json(products);
});

router.get('/filter', (req, res) => {
  res.send('Yo soy un filtro.');
});

router.get('/:id', validatorHandler(getProductSchema, 'params'), async (req, res, next) => {
  try {
    // const id = req.params.id; //la linea de codigo de debajo es equivalente a esta linea comentada.
    const { id } = req.params;
    const product = await service.findOne(id);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

//las rutas '/products/:id' y '/products/fliter' provocaran un conflicto si la ruta dinamica (.../:id) viene antes que la ruta estatica (.../filter). Para ello, coloca primero la ruta estatica para solucionar el problema.

router.post('/', validatorHandler(createProductSchema, 'body'), async (req, res) => {
  const body = req.body;
  const newProduct = await service.create(body);

  //res.json({ ... })
  res.status(201).json(newProduct);
});

//Update some attributes of a specific product using PATCH request
//los validatorHandlers tienen que ir en orden de lo que validará primero...
router.patch('/:id', validatorHandler(getProductSchema, 'params'), validatorHandler(updateProductSchema, 'body'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await service.update(id, body);
    res.json(product);
  } catch (err) {
    next(err);
  }
});

//delete a product
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const rta = await service.delete(id);
  res.json(rta);
});

module.exports = router;
