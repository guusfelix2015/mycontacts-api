const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'myroot',
  password: 'myroot',
  database: 'mycontacts',
});

client.connect();

exports.query = async (query) => {
  const { rows } = await client.query(query);
  return rows;
};
