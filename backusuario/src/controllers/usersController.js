const usersLogin = require('../models/usersLogin');
const createUsers = async (request, response) => {
  const createUsers = await usersLogin.createUsers(request.body);
  return response.status(201).json(createUsers);
};
const getUserByUsernameAndPassword = async (req, res) => {
  const { username, password } = req.body; // Obteniendo valores desde el cuerpo de la petición
  const user = await usersLogin.getUserByUsernameAndPassword(username, password);
if (user && user.length > 0) {
   
   return res.status(200).json({ user });
 } else {
   return res.status(404).json({ message: 'User not found' });
  }
};
module.exports = {
  createUsers,
  getUserByUsernameAndPassword
};