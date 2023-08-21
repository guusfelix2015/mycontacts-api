const ContactRepository = require('../repositories/ContactRepository');

class ContactController {
  // Listar todos os contatos
  index(request, response) {
    const contacts = ContactRepository.findAll();

    response.json(contacts);
  }

  // Obter um contato
  show(request, response) {
    const { id } = request.params;
    const contact = ContactRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'Contact not found contact' });
    }

    response.json(contact);
  }

  // Criar um contato
  store() {}

  // Atualizar um contato
  update() {}

  // Remover um contato
  delete(request, response) {
    const { id } = request.params;

    const contact = ContactRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'Contact not found contact' });
    }

    ContactRepository.delete(id);
    // 204 - No content
    response.sendStatus(204);
  }
}

module.exports = new ContactController();
