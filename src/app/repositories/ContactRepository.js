const { v4 } = require('uuid');

const db = require('../../database');

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
  async create({
    name, email, phone, category_id,
  }) {
    const [row] = await db.query(
      `
      INSERT INTO contacts(name, email, phone, category_id)
      VALUES($1, $2, $3, $4)
      RETURNING *
    `,
      [name, email, phone, category_id],
    );
    return row;
  }

  async update(id, {
    name, email, phone, category_id,
  }) {
    const [row] = await db.query(`
      UPDATE contacts
      SET name = $1, email = $2, phone = $3, category_id = $4
      WHERE id = $5
      RETURNING *
    `, [name, email, phone, category_id, id]);

    return row;
  }

  // Busca todos os contatos
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(
      `SELECT * FROM contacts ORDER BY name ${direction}`,
    );

    return rows;
  }

  // Busca uma contact pelo id
  async findById(id) {
    const [row] = await db.query('SELECT * FROM contacts WHERE id = $1', [id]);

    return row;
  }

  // Busca uma contact pelo email
  async findByEmail(email) {
    const [row] = await db.query('SELECT * FROM contacts WHERE email = $1', [
      email,
    ]);

    return row;
  }

  // Deleta um contato pelo id
  delete(id) {
    contacts = contacts.filter((contact) => contact.id !== id);
  }
}

module.exports = new ContactRepository();
