
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routers');

const app = express();

app.use(bodyParser.json());

app.use('/', routes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
app.use('/', routes);