import { Router } from "express";
import Cart from "../models/cart.model.js";

const cartRouter = Router();

// crear carrito
cartRouter.post("/", async (req, res) => {
    try {
        const cart = new Cart();
        await cart.save();
        res.status(201).json({ status: "success", payload: cart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// obtener carrito por id
cartRouter.get("/:cid", async (req, res) => {
    try {
        const cid = req.params.cid;
        const cart = await Cart.findById(cid).populate("products.product");
        if (!cart) {
            return res.status(404).json({ message: "Carrito no encontrado" });
        }
        res.status(200).json({ status: "success", payload: cart.products});
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});

// agregar producto a carrito
cartRouter.post("/:cid/product/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
        const updatedCart = await Cart.findByIdAndUpdate(cid, { $push: { products: { product: pid, quantity } }}, { new: true, runValidators: true });
        res.status(200).json({ status: "success", payload: updatedCart });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});


//eliminamos un producto del carrito
cartRouter.delete("/:cid/products/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;

    const cart = await Cart.findById(cid);
    if (!cart) {
      return res.status(404).json({ message: "Carrito no encontrado" });
    }

    
    cart.products = cart.products.filter(
      (item) => item.product.toString() !== pid
    );

    await cart.save();

    res.status(200).json({ status: "success", payload: cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//eliminar todos los productos de un carrito
cartRouter.delete("/:cid/products", async (req, res) => {
  try {
    const { cid } = req.params;

    const cart = await Cart.findById(cid);
    if (!cart) {
      return res.status(404).json({ message: "Carrito no encontrado" });
    }

    cart.products = [];
    await cart.save();

    res.status(200).json({ status: "success", message: "Carrito vaciado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
export default cartRouter;