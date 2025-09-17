import crypto from "crypto";
import fs from "fs/promises";

class CartManager {
    constructor(pathFile) {
        this.pathFile = pathFile;
    }

    async _loadCarts() {
        try {
            const fileData = await fs.readFile(this.pathFile, "utf-8");
            return JSON.parse(fileData);
        } catch {
            return [];
        }
    }

    async _saveCarts(carts) {
        await fs.writeFile(this.pathFile, JSON.stringify(carts, null, 2), "utf-8");
    }

    async createCart() {
        const carts = await this._loadCarts();
        const newCart = {
            id: crypto.randomUUID(),
            products: []
        };
        carts.push(newCart);
        await this._saveCarts(carts);
        return newCart;
    }

    async getCartById(cid) {
        const carts = await this._loadCarts();
        return carts.find(cart => cart.id === cid);
    }

    async addProductToCart(cid, pid) {
        const carts = await this._loadCarts();
        const cartIndex = carts.findIndex(cart => cart.id === cid);
        if (cartIndex === -1) {
            throw new Error("Carrito no encontrado");
        }

        const cart = carts[cartIndex];
        const productIndex = cart.products.findIndex(p => p.product === pid);

        if (productIndex !== -1) {
            cart.products[productIndex].quantity += 1;
        } else {
            cart.products.push({ product: pid, quantity: 1 });
        }

        carts[cartIndex] = cart;
        await this._saveCarts(carts);
        return cart;
    }
}

export default CartManager;
