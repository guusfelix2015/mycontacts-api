const uuid = require('uuid');

const contacts = [
  {
    id: uuid.v4(),
    name: 'John Doe',
    email: 'gusfelix@gmail.com',
    phone: '123456789',
    category_id: uuid.v4(),
  },
  {
    id: uuid.v4(),
    name: 'Jane Doe',
    email: 'jane@gmail.com',
    phone: '987654321',
    category_id: uuid.v4(),
  },
];

class ContactRepository {
  // Busca todos os contatos
  findAll() {
    return contacts;
  }
}

module.exports = new ContactRepository();
