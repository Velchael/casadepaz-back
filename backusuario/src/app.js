const express = require('express');
const cors = require('cors');
const router = require('./router');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Agrega esta línea para interpretar cuerpos x-www-form-urlencoded
app.use(cors());
app.use(router);
// Agrega esto en tu código de configuración del servidor Express
app.options('/users/confirm/:token', (req, res) => {
    // Configura los encabezados CORS adecuados
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    // Responde con éxito
    res.status(200).end();
  });
  // Luego, agrega el manejador de la ruta POST
  app.post('/users/confirm/:token', (req, res) => {
    // Tu lógica de confirmación de correo electrónico aquí
  });
module.exports = app;

