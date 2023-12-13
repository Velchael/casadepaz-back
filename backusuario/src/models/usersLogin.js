const connection = require('./connection');
const nodemailer = require('nodemailer');
const { EMAIL_USER, KINGHOST_SMTP_HOST, KINGHOST_SMTP_PORT, KINGHOST_SMTP_USER, KINGHOST_SMTP_PASSWORD } = require('../config.js');
const crypto = require('crypto'); // Para generar enlaces seguros
const createUsers = async (users) => {
  const { username, email, password } = users;
  const query = 'INSERT INTO users(username, email, password, confirmation_token) VALUES (?,?,?,?)';
  // Generar un token único y seguro para la confirmación
  const confirmationToken = crypto.randomBytes(32).toString('hex');

  try {
    const [createdUsers] = await connection.execute(query, [username, email, password, confirmationToken]);
    const transporter = nodemailer.createTransport({
      host: KINGHOST_SMTP_HOST,
      port: KINGHOST_SMTP_PORT,
      secure: true,
      auth: {
        user: KINGHOST_SMTP_USER,
        pass: KINGHOST_SMTP_PASSWORD,
      }
    });

    const mailOptions = {
      from: EMAIL_USER,
      to: email,
      subject: 'Confirmación de registro',
      text: `Haz clic en este enlace para confirmar tu registro: http://127.0.0.1:5501/confirm-email.html?token=${confirmationToken}`
    };

    // Envía el correo electrónico
    const info = await transporter.sendMail(mailOptions);
    console.log('Correo enviado...: ' + info.response);

    return { message: 'Usuario registrado con éxito. Por favor, confirma tu correo electrónico' };
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    throw error;
  }
};

const getUserByUsernameAndPassword = async (username, email, password) => {
  const [user] = await connection.execute('SELECT * FROM users WHERE username = ? AND email = ? AND password = ?', [username, email, password]);
  return user;
};

const confirmUserEmail = async (confirmationToken) => {
  try {
    if (!confirmationToken) {
      throw new Error('Token de confirmación no válido');
    }
    const [user] = await connection.execute('SELECT * FROM users WHERE confirmation_token = ?', [confirmationToken]);
    
    // Verifica si el usuario no existe o si ya ha confirmado su correo
    if (!user || user.length === 0 || user[0].confirmed) {
      throw new Error('Token de confirmación no válido o ya utilizado');
    }
    const email = user[0].email;

    await connection.execute('UPDATE users SET confirmed = 1, confirmation_token = NULL WHERE email = ?', [email]);

    return { message: 'Correo electrónico confirmado con éxito' };
  } catch (error) {
    console.error('Error al confirmar el correo electrónico:', error);

  if (error.code) {
    console.error('Código de error MySQL:', error.code);
    console.error('Número de error MySQL:', error.errno);
    console.error('Mensaje de error MySQL:', error.sqlMessage);
  }
   // Puedes personalizar el manejo de errores según el tipo de error
   if (error.message === 'Token de confirmación no válido') {
    error.code = 'INVALID_TOKEN';
  } else if (error.message === 'Token de confirmación no válido o ya utilizado') {
    error.code = 'USED_TOKEN';
  }
    throw error;
  }
};

module.exports = {
  createUsers,
  getUserByUsernameAndPassword,
  confirmUserEmail
};