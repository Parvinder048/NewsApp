const express = require('express');
const Router = express.Router();
const {
  getAllUsers,
  addedUser,
  loginUser,
  updatedUser,
  deletedUser,
  verifyToken,
  sendmail
} = require('../Controllers/userControllers');

const validator = require('../Middelwares/validator');

Router.get('/', getAllUsers);
Router.get('/verify', verifyToken);
Router.post('/register', validator, addedUser);

Router.post('/sendmail',sendmail)
Router.post('/login', loginUser);
Router.put('/update', updatedUser);
Router.delete('/delete', deletedUser);

module.exports = Router;
