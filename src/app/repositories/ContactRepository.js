const { v4 } = require('uuid');

let contacts = [
  {
    id: v4(),
    name: 'gustavo',
    email: 'gusfelix@gmail.com',
    phone: '123456789',
    category_id: v4(),
  },
  {
    id: v4(),
    name: 'ana',
    email: 'jane@gmail.com',
    phone: '987654321',
    category_id: v4(),
  },
];

class ContactRepository {
  // Busca todos os contatos
  findAll() {
    return contacts;
  }

  findById(id) {
    return contacts.find((contact) => contact.id === id);
  }

  delete(id) {
    contacts = contacts.filter((contact) => contact.id !== id);
  }
}

module.exports = new ContactRepository();
