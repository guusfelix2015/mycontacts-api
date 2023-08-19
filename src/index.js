const express = require('express');

const app = express();

const routes = require('./routes');

app.use(routes);

app.listen(3001, () => {
  console.log('Server is running at port 3001');
});
