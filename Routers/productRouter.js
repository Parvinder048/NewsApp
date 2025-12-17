const express = require('express');
const Router = express.Router();
const { getAllProducts, addedProduct, updatedProduct, deletedProduct } = require('../Controllers/productControllers');

Router.get('/', getAllProducts)
Router.post('/add', addedProduct)
Router.put('/update', updatedProduct);
Router.delete('/delete', deletedProduct);


module.exports = Router;