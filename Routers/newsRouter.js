const express = require('express');
const Router = express.Router();
const {  getAllNews,  updateNews,  deleteNews,  createNews, getNewsByUserId} = require('../Controllers/newsControllers');
const checkLogin = require('../Middelwares/checkLogin');

Router.get('/', getAllNews);
Router.get('/:userId', getNewsByUserId);

Router.post('/create',checkLogin, createNews);
Router.put('/update',checkLogin,  updateNews);
Router.delete('/delete',checkLogin, deleteNews);
module.exports = Router;




