import { Router } from 'express';
import ProductRepository from '../dao/repositories/ProductRepository.js';
import cartModel from '../dao/models/cartModel.js';
import productModel from '../dao/models/productModel.js';
import indexController from '../controllers/indexController.js';

const productRepository = new ProductRepository();

const router = Router();

router.get('/', indexController.welcome);

router.get('/register', indexController.register);

router.get('/products', indexController.products);

router.get('/cart', indexController.cart);

router.get('/realtimeproducts', indexController.realtimeproducts);

router.get('/login', indexController.login);

export default router;