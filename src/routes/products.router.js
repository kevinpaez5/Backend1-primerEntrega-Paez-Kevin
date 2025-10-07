import { Router } from "express";
import ProductManager from "../managers/productManager.js";

const router = Router();
const productManager = new ProductManager("./src/data/products.json");

router.get("/", async (req, res) => {
    try {
        const products = await productManager.getProducts(); 
        res.status(200).json({ mesage: "Lista de productos", products });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// obtener por id el producto
router.get("/:pid", async (req, res) => {
    try {
        const pid = req.params.pid;
        const product = await productManager.getProductById(pid); 
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.status(200).json({ mesage: "Producto encontrado", product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// agregar producto
router.post("/", async (req, res) => {
    try {
        const newProduct = req.body;
        const products = await productManager.addProduct(newProduct); 
        res.status(201).json({ mesage: "Producto agregado", products });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// actualizar producto
router.put("/:pid", async (req, res) => {
    try {
        const pid = req.params.pid;
        const updates = req.body;
        const products = await productManager.setProductById(pid, updates);
        res.status(200).json({ mesage: "Producto actualizado", products });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// eliminar producto por id
router.delete("/:pid", async (req, res) => {
    try {
        const pid = req.params.pid;
        const products = await productManager.deleteProductById(pid); 
        res.status(200).json({ mesage: "Producto eliminado", products });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;