require('dotenv').config();
const express = require('express');
const axios = require('axios');
const controllers = require('./controllers');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('client/dist'));
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

app.get('/search', controllers.searchShow);
