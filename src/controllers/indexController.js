import productService from "../services/productService.js";
import cartService from "../services/cartService.js";

const welcome = async (req, res) => {
    try {
      res.render("welcome", { title: "Welcome | Valsaa", style: "home.css" });
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Error.');
    }
    
}

const register = async (req, res) => {
    try {
      if (req.session.user) {
        res.redirect("/products");
      }
      res.render("register", {
        title: "Register | Valsaa",
        style: "login.css",
        failRegister: req.session.failRegister ?? false,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Error.');
    }
    
}

const products = async (req, res) => {
    try {
      const user = req.session.user;
      const { page = 1, limit = 10, category, query, sort } = req.query;
      
      let products = await productService.getProducts(page, limit, category, query, sort);
      console.log("Aca los productos: ", products.docs);

      res.render("products", { 
        title: "Products | Valsaa", 
        style: "product.css", 
        user: user, 
        products: products });
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Error.');
    }
    
}

const cart = async (req, res) =>{//FIJARME SI FUNCIONA
    try {
      const cid = req.params.cid;
      //const cart = await cartModel.findById(cid).populate("products.productId").lean();
      const cart = await cartService.getCartById(cid);
      console.log(cart);
      res.render("cart", { title: "Cart view", cart, style: "cart.css" });
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Error.');
    }
}

const realtimeproducts = async (req, res) => {
    try {
      let products = await productModel.find();
      products = products.map((p) => p.toJSON());
      res.render("home", { title: "RealTime-Products ", style: "RTP.css", products });
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Error.');
    }
    
}

const login = async (req, res) => {
    try {
      if(req.session.user){
        res.redirect("/products");
      }else{
        res.render("login", {
          title: "Valsaa | Login",
          style: "login.css",
          failLogin: req.session.failLogin ?? false,
        });
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Error.');
    }
    
}

export default {
    welcome,
    register,
    products,
    cart,
    realtimeproducts,
    login
};