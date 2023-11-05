const { faker } = require('@faker-js/faker');

class UsersService {
  constructor() {
    this.users = [];
    this.generate();
  }

  generate() {

    //si el parametro size no es especificado, entonces por defecto sera de 10.
    //const limit = size || 10;

    const limit = 100;

    for (let i = 0; i < limit; i++) {
      this.users.push({
        id: faker.string.uuid(),
        name: faker.person.fullName()
      });
    }
  }

  create() {}

  find() {
    return this.users;
  }

  findOne(id) {
    return this.users.find(item => item.id === id);
  }

  update() {}

  delete() {}
}

module.exports = UsersService;
