const express = require('express');
const router = express.Router();
const upload = require('../middlewares/fileHandler');
const isLogged = require('../middlewares/isLogged');
const isAdmin = require('../middlewares/isAdmin');

const { getAllUser, signup, signin, getUser, updateUser, logout, addProductToCart, removeProductFromCart } = require('../controllers/user');

router.route('/').get(isLogged, getUser);
router.route('/getAllUser').get(isLogged, isAdmin, getAllUser);
router.route('/signup').post(upload.single('photo'), signup);
router.route('/signin').post(upload.none(), signin);
router.route('/addProductToCart').put(isLogged, upload.none(), addProductToCart);
router.route('/removeProductFromCart').delete(isLogged, upload.none(), removeProductFromCart);
router.route('/updateUser').put(isLogged, isAdmin, upload.single('photo'), updateUser);
router.route('/logout').delete(isLogged, logout);

module.exports = router;