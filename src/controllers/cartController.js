import cartService from '../services/cartService.js';

const createCart = async (req, res) => {
    try{
        const carts = await cartService.createCart();
        res.status(200).send({
            status: 'success',
            payload: carts
        });
    }catch (error){
        res.status(400).send({
            status: 'error',
            message: error.message
        });
    }
}

const getCarts = async (req, res) => {
    try {
        const carts = await cartService.getCarts();
        res.status(200).send({
            status: 'success',
            payload: carts
        });  
    } catch (error) {
        res.status(404).send({ 
            status: 'error',
            message: error.message
        });
    }
    
}

const getCartById = async (req, res) => {// PROBAR SI ESTE FUNCIONA
    try{
        const { cid } = req.params;
        const cart = await cartService.getCartById(cid);
        //const cart = await cartModel.findById(cid).populate("products.productId").lean();
        console.log(cart.products);
        //res.send(cart);
        res.status(200).render('cart', cart);
    }catch (error){
        res.status(error.statusCode || 500).send({
            status: 'error',
            message: error.message
        });
    }
}

const updateQuantityCart = async (req, res) =>{
    try {
        const { cid, pid } = req.params;
        const quantity = req.body.quantity;
        console.log(quantity);

        await cartService.updateQuantityCart(cid, pid, quantity);

        res.status(200).send({
            status:'success',
            message: 'Quantity updated successfully.'
        });
    } catch (error) {
        console.error(error);
        res.status(400).send({
            status: 'error',
            message: error.message}
        );
    }
}

const addToCart = async (req, res) => {//Arreglar para pasarle quantity por body
    try{
        const { cid, pid } = req.params;
        await cartService.addToCart(cid, pid);
        res.status(200).send({
            status:'success',
            message: 'Product successfully added to cart.'
        });
    }catch (error){
        res.status(400).send({
            status: 'error',
            message: error.message
        });
    }
    
}

const deleteCart = async (req, res) =>{
    try {
        const { cid } = req.params;
        await cartService.deleteCart(cid);
        res.status(200).send({
            status: 'Cart successfully deleted.'
        });
    } catch (error) {
        res.status(404).send({
            status: 'error',
            message: error.message
        });
    }
    
}

const deleteProdFromCart = async (req, res) =>{
    try {
        const { cid, pid } = req.params;
        await cartService.deleteProdFromCart(cid, pid);
        res.status(200).send({
            status: 'Product successfully deleted from cart.'
        });
    } catch (error) {
        res.status(400).send({
            status: 'error',
            message: error.message
        });
    }
}

export default {
    createCart,
    getCarts,
    getCartById,
    updateQuantityCart,
    addToCart,
    deleteCart,
    deleteProdFromCart
};