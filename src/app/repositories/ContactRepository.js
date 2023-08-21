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
  create({
    name, email, phone, category_id,
  }) {
    const newContact = {
      id: v4(),
      name,
      email,
      phone,
      category_id,
    };

    contacts.push(newContact);
  }

  update(id, {
    name, email, phone, category_id,
  }) {
    const updatedContact = {
      id,
      name,
      email,
      phone,
      category_id,
    };

    contacts = contacts.map((contact) => (contact.id === id ? updatedContact : contact));
  }

  // Busca todos os contatos
  findAll() {
    return contacts;
  }

  // Busca uma contact pelo id
  findById(id) {
    return contacts.find((contact) => contact.id === id);
  }

  // Busca uma contact pelo email
  findByEmail(email) {
    return contacts.find((contact) => contact.email === email);
  }

  // Deleta um contato pelo id
  delete(id) {
    contacts = contacts.filter((contact) => contact.id !== id);
  }
}

module.exports = new ContactRepository();
