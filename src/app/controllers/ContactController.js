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
  store(request, response) {
    const {
      name, email, phone, category_id,
    } = request.body;

    if (!name) {
      response.status(400).json({ error: 'Name is required' });
    }

    const contactExists = ContactRepository.findByEmail(email);

    if (contactExists) {
      response.status(400).json({ error: 'This email is already is use' });
    }

    const contact = ContactRepository.create({
      name,
      email,
      phone,
      category_id,
    });

    response.json(contact);
  }

  // Atualizar um contato
  update(request, response) {
    const { id } = request.params;
    const {
      name, email, phone, category_id,
    } = request.body;

    const contactExists = ContactRepository.findById(id);

    if (!contactExists) {
      return response.status(404).json({ error: 'Contact not found contact' });
    }

    if (!name) {
      response.status(400).json({ error: 'Name is required' });
    }

    const contactByEmail = ContactRepository.findByEmail(email);

    if (contactByEmail && contactByEmail.id !== id) {
      response.status(400).json({ error: 'This email is already is use' });
    }

    const contact = ContactRepository.update(id, {
      name,
      email,
      phone,
      category_id,
    });

    response.json(contact);
  }

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
