const express = require('express');
const router = express.Router();
const upload = require('../middlewares/fileHandler');
const isLogged = require('../middlewares/isLogged');
const isAdmin = require('../middlewares/isAdmin');

const { addProduct, updateProduct, removeProduct, getAllProducts } = require('../controllers/product');

router.route('/getAllProducts').get(isLogged, getAllProducts);
router.route('/addProduct').post(isLogged, isAdmin, upload.array('photos'), addProduct);
router.route('/updateProduct').put(isLogged, isAdmin, upload.array('photos'), updateProduct);
router.route('/removeProduct').delete(isLogged, isAdmin, removeProduct);


module.exports = router;