const ContactRepository = require('../repositories/ContactRepository');

class ContactController {
  // Listar todos os contatos
  async index(request, response) {
    const { orderBy } = request.query;
    const contacts = await ContactRepository.findAll(orderBy);

    response.json(contacts);
  }

  // Obter um contato
  async show(request, response) {
    const { id } = request.params;
    const contact = await ContactRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'Contact not found contact' });
    }

    response.json(contact);
  }

  // Criar um contato
  async store(request, response) {
    const {
      name, email, phone, category_id,
    } = request.body;

    if (!name) {
      response.status(400).json({ error: 'Name is required' });
    }

    const contactExists = await ContactRepository.findByEmail(email);

    if (contactExists) {
      response.status(400).json({ error: 'This email is already is use' });
    }

    const contact = await ContactRepository.create({
      name,
      email,
      phone,
      category_id,
    });

    return response.json(contact);
  }

  // Atualizar um contato
  async update(request, response) {
    const { id } = request.params;
    const {
      name, email, phone, category_id,
    } = request.body;

    const contactExists = await ContactRepository.findById(id);

    if (!contactExists) {
      return response.status(404).json({ error: 'Contact not found contact' });
    }

    if (!name) {
      response.status(400).json({ error: 'Name is required' });
    }

    const contactByEmail = await ContactRepository.findByEmail(email);

    if (contactByEmail && contactByEmail.id !== id) {
      response.status(400).json({ error: 'This email is already is use' });
    }

    const contact = await ContactRepository.update(id, {
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
