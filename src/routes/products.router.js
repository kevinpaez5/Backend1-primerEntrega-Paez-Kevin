import express from "express";
import Product from "../models/product.model.js";

const productRouter = express.Router();


productRouter.get("/", async (req, res) => {
    try {
        const {limit = 10, page= 1} = req.query;

        const data = await Product.paginate( {}, {limit, page} ); 
        const products = data.docs;
        delete data.docs;

        res.status(200).json({ status: "success", payload: products, ...data });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// obtener por id el producto
productRouter.get("/:pid", async (req, res) => {
    try {
        const pid = req.params.pid;
        const product = await Product.findById(pid); 
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.status(200).json({ status: "success", payload: product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// agregar producto
productRouter.post("/", async (req, res) => {
    try {
        const { title, description, price, code, stock, category } = req.body;
        const product = await Product.create({ title, description, price, code, stock, category });

        res.status(201).json({ status: "success", payload: product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// actualizar producto
productRouter.put("/:pid", async (req, res) => {
    try {
        const pid = req.params.pid;
        const updates = req.body;
        const products = await Product.findByIdAndUpdate(pid, updates, {new:true});
        if(!products){
            return res.status(404).json({ message: "Producto no encontrado" }); 
        }
        res.status(200).json({ status: "success", payload: products });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// eliminar producto por id
productRouter.delete("/:pid", async (req, res) => {
    try {
        const pid = req.params.pid;
        const deletedProduct = await Product.findByIdAndDelete(pid); 
        if (!deletedProduct) {
        return res.status(404).json({ message: "Producto no encontrado" });
    }
        res.status(200).json({ status: "success", payload: deletedProduct });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default productRouter;