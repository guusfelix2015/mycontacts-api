const ContactRepository = require("../repositories/ContactRepository");
const isValidUUID = require("../utils/isValidUUID");

class ContactController {
  // Listar todos os contatos
  async index(request, response) {
    const { orderBy } = request.query;
    const contacts = await ContactRepository.findAll(orderBy);

    return response.json(contacts);
  }

  // Obter um contato
  async show(request, response) {
    const { id } = request.params;

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: "Invalid user id" });
    }

    const contact = await ContactRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: "Contact not found" });
    }

    return response.json(contact);
  }

  // Criar um contato
  async store(request, response) {
    const { name, email, phone, category_id } = request.body;

    if (!name) {
      response.status(400).json({ error: "Name is required" });
    }

    if (category_id && !isValidUUID(category_id)) {
      return response.status(400).json({ error: "Invalid category" });
    }

    if (email) {
      const contactExists = await ContactRepository.findByEmail(email);

      if (contactExists) {
        response.status(400).json({ error: "This email is already is use" });
      }
    }

    const contact = await ContactRepository.create({
      name,
      email: email || null,
      phone,
      category_id: category_id || null,
    });

    return response.status(200).json(contact);
  }

  // Atualizar um contato
  async update(request, response) {
    const { id } = request.params;
    const { name, email, phone, category_id } = request.body;

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: "Invalid conmtact id" });
    }

    if (category_id && !isValidUUID(category_id)) {
      return response.status(400).json({ error: "Invalid category" });
    }

    if (!name) {
      response.status(400).json({ error: "Name is required" });
    }

    const contactExists = await ContactRepository.findByEmail(email);

    if (contactExists) {
      response.status(400).json({ error: "This email is already is use" });
    }

    if (email) {
      const contactByEmail = await ContactRepository.findByEmail(email);
      if (contactByEmail && contactByEmail.id !== id) {
        response.status(400).json({ error: "This email is already is use" });
      }
    }

    const contact = await ContactRepository.update(id, {
      name,
      email: email || null,
      phone,
      category_id: category_id || null,
    });

    return response.json(contact);
  }

  // Remover um contato
  async delete(request, response) {
    const { id } = request.params;

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: "Invalid contact id" });
    }

    const contact = await ContactRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: "Contact not found contact" });
    }

    await ContactRepository.delete(id);
    // 204 - No content
    response.sendStatus(204);
  }
}

module.exports = new ContactController();
