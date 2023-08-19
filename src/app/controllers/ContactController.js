class ContactController {
  // Listar todos os contatos
  index(request, response) {
    response.send('Send form Contact controller');
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
