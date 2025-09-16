import express from "express";
import ProductManager from "./productManager.js";

const app = express();
app.use(express.json());
const productManager = new ProductManager("./products.json");

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

app.post("/api/carts", (req, res) => {});

app.get("/api/carts/:cid", (req, res) => {});

app.post("/api/carts/:cid/product/:pid", (req, res) => {});

app.listen(8080, () => {
    console.log("Servidor escuchando en http://localhost:8080");
});

