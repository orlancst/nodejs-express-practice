const { faker, fa } = require('@faker-js/faker');
const boom = require('@hapi/boom');

class ProductsService {
  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {

    //si el parametro size no es especificado, entonces por defecto sera de 10.
    //const limit = size || 10;

    const limit = 100;

    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.url(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const newProduct = {
      id: faker.string.uuid(), //por lo general el id se debe generar
      ...data //entregar el resto de parametros que se piden de un objeto
    }
    this.products.push(newProduct)
    return newProduct;
  }

  // Crear con los datos que nos brinda el usuario
  // create({ name, price, image }) {
  //   const product = {
  //     id: faker.string.uuid(),
  //     name,
  //     price,
  //     image,
  //   };
  //   this.products.push(product);
  //   return product;
  // }

  find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products);
      }, 1500);
    })
    //return this.products;
  }

  async findOne(id) {
    //const name = this.getTotal(); provocar un error

    const product = this.products.find(item => item.id === id);

    if (!product) {
      throw boom.notFound('Product not found!');
    }

    //Mostrar error al intentar buscar un producto existente, pero que se encuentra bloqueado
    if (product.isBlock) {
      throw boom.conflict('Product is block');

    }

    return product;
  }

  async update(id, changes) {
    //buscar el indice de donde se encuentra en el array
    const index = this.products.findIndex(item => item.id === id);

    if (index === -1) {
      throw boom.notFound('Product not found!');
    }

    const product = this.products[index];

    //Con esto solo actualiza solo los parametros cambiados...
    this.products[index] = {
      ...product,
      ...changes
    };
    return this.products[index];

  }

  async delete(id) {
    //buscar el indice de donde se encuentra en el array
    const index = this.products.findIndex(item => item.id === id);

    if (index === -1) {
      throw boom.notFound('Product not found!');
    }

    this.products.splice(index, 1);
    return { id };
  }
}

module.exports = ProductsService;
