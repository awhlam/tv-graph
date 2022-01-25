require('dotenv').config();
const express = require('express');
const axios = require('axios');
const models = require('./models');
const middleware = require('./middleware');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('client/dist'));
app.use(express.json());
app.use(middleware.logger);

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

app.get('/search', models.searchShow);
