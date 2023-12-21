const express = require('express');
const cors = require('cors');
const router = require('./router');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const app = express();


const corsOptions = {
 origin: 'https://casadepaz.intelsiteweb.com',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.options('/users/confirm/:token', (req, res) => {
   //Configura los encabezados CORS adecuados
  res.header('Access-Control-Allow-Methods', 'POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', 'true');
  // Responde con éxito
  res.status(200).end();
});

// Luego, agrega el manejador de la ruta POST
app.post('/users/confirm/:token', (req, res) => {
  // Tu lógica de confirmación de correo electrónico aquí
});

app.use(router);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo deu errado!!!!!!!', details: err.message });
});

module.exports = app;

