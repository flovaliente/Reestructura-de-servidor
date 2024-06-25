import { Router } from 'express';
import cartController from '../controllers/cartController.js';

const router = Router();

// -Create carts
router.post('/', cartController.createCart);

// -Get carts
router.get('/', cartController.getCarts);

// -Get cart by id
router.get('/:cid', cartController.getCartById);

// -Actualizar el quantity
router.put('/:cid/product/:pid', cartController.updateQuantityCart);

// -Add product to cart
router.post('/:cid/product/:pid', cartController.addToCart);

// -Delete cart
router.delete('/:cid', cartController.deleteCart);

// Delete product from cart
router.delete('/:cid/product/:pid', cartController.deleteProdFromCart);

export default router;