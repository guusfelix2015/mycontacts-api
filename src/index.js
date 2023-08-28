const express = require('express');
const cors = require('cors');
// eslint-disable-next-line import/no-extraneous-dependencies
require('express-async-errors');

const routes = require('./routes');

const app = express();

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Se você estiver lidando com cookies/sessões
}));

app.use(routes);
app.use((error, request, response, next) => {
  console.log('########### Error Handler');
  console.log(error);
  response.sendStatus(500);
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});