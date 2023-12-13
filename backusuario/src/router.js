const express = require('express')
const router = express.Router();
const usersController = require('./controllers/usersController');
router.post('/users', usersController.createUsers);
router.post('/users/login', usersController.getUserByUsernameAndPassword);
module.exports = router;
//////