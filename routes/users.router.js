const express = require('express');
const UsersService = require('./../services/users.service');

const router = express.Router();
const service = new UsersService();

router.get('/', (req, res) => {

  const users = service.find();

  res.json(users);

});

router.get('/:id', (req, res) => {
  // const id = req.params.id; //la linea de codigo de debajo es equivalente a esta linea comentada.
  const { id } = req.params;

  const user = service.findOne(id);

  res.json(user);

});

router.get('/search', (req, res) => {
  //recoger parametros con req.query
  const { limit, offset } = req.query;

  if (limit && offset) {
    res.json({
      limit,
      offset
    })
  } else {
    res.send('No hay parametros.')
  }

});

module.exports = router;
