import express from "express";
import ProductManager from "./src/managers/productManager.js";
import CartManager from "./src/managers/cartManager.js";

const cartManager = new CartManager("./src/data/carts.json");
const app = express();
app.use(express.json());
const productManager = new ProductManager("./src/data/products.json");

app.get("/", (req, res) => {
    res.send("Hello World!");
}); 

// /api/products

app.get("/api/products", async (req, res) => {
    try {
    const products = await productManager.getProducts(); 
    res.status(200).json({mesage: "Lista de productos", products});
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
});

app.delete("/api/products/:pid", async (req, res) => {
    try {
        const pid = req.params.pid;
        const products = await productManager.deleteProductById(pid); 
        res.status(200).json({mesage: "Producto eliminado", products});
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
})

app.post("/api/products", async (req, res) => {
    try {
        const newProduct = req.body;
        const products = await productManager.addProduct(newProduct); 
        res.status(201).json({mesage: "Producto agregado", products});
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
})

app.put("/api/products/:pid", async (req, res) => {
    try {
        const pid = req.params.pid;
        const updates = req.body;
        const products = await productManager.setProductById(pid, updates);
        res.status(200).json({mesage: "Producto actualizado", products});
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
})

//producto a traves de su id
app.get("/api/products/:pid", async (req, res) => {
    try {
        const pid = req.params.pid;
        const product = await productManager.getProductById(pid); 
        if (!product) {
            return res.status(404).json({message: "Producto no encontrado"});
        }
        res.status(200).json({mesage: "Producto encontrado", product});
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
})

// /api/carts

app.post("/api/carts", async(req, res) => {
    try {
        const newCart = await cartManager.createCart();
        res.status(201).json({ message: "Carrito creado", cart: newCart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get("/api/carts/:cid", async(req, res) => {
    try {
        const cid = req.params.cid;
        const cart = await cartManager.getCartById(cid);
        if (!cart) {
            return res.status(404).json({ message: "Carrito no encontrado" });
        }
        res.status(200).json({ products: cart.products });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post("/api/carts/:cid/product/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const updatedCart = await cartManager.addProductToCart(cid, pid);
        res.status(200).json({ message: "Producto agregado al carrito", cart: updatedCart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.listen(8080, () => {
    console.log("Servidor escuchando en http://localhost:8080");
});

