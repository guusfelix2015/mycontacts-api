const ContactRepository = require('../repositories/ContactRepository');

class ContactController {
  // Listar todos os contatos
  index(request, response) {
    const contacts = ContactRepository.findAll();

    response.json(contacts);
  }

  // Obter um contato
  show() {}

  // Criar um contato
  store() {}

  // Atualizar um contato
  update() {}

  // Remover um contato
  delete() {}
}

module.exports = new ContactController();
