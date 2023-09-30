const express = require('express');
const cors = require('cors');
const router = require('./router');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Agrega esta línea para interpretar cuerpos x-www-form-urlencoded
app.use(cors());
app.use(router);

module.exports = app;
