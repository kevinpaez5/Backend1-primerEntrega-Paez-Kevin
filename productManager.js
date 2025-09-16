import crypto from "crypto";
import fs from "fs";

class ProductManager {
    constructor(pathFile) {
        this.pathFile = pathFile;
    }

    generateNewid() {
        return crypto.randomUUID();
    }

    async addProduct (newProduct) {
        try {
            const fileData = await fs.readFile(this.pathFile, "utf-8");
            const products = JSON.parse(fileData);

            const newId = this.generateNewid();

            //creamos un producto nuevo y lo agregamos
            const product = {id: newId, ...newProduct};
            products.push(product);

            //guardamos los productos en el json
            await fs.writeFile(this.pathFile, JSON.stringify(products, null, 2), "utf-8");
            return products;
        } catch (error) {
            throw new Error("Error al agregar el producto" + error);
        }
    }

    async getProducts () {
        try {
            const fileData = await fs.readFile(this.pathFile, "utf-8");
            const products = JSON.parse(fileData);
            return products;
        } catch (error) {
            throw new Error("Error al obtener los productos" + error);
        }
    }

    async setProductById (productId, updates) {
        try {
            //recuperar productos
            const fileData = await fs.readFile(this.pathFile, "utf-8");
            const products = JSON.parse(fileData);

            const indexProduct = products.findIndex(product => product.id === productId);

            if (indexProduct === -1) {
                throw new Error("Producto no encontrado");
            }

            products[indexProduct] = {...products[indexProduct], ...updates};

            //guardamos los productos en el json
            await fs.writeFile(this.pathFile, JSON.stringify(products, null, 2), "utf-8");
            return products
        } catch (error) {
            throw new Error("Error al actualizar el producto" + error);
        }
    }

    async deleteProductById (productId) {
        try {
            //recuperar productos
            const fileData = await fs.readFile(this.pathFile, "utf-8");
            const products = JSON.parse(fileData);

            const filteredProducts = products.filter(product => product.id !== productId);

            //guardamos los productos actualizados en el json
            await fs.writeFile(this.pathFile, JSON.stringify(filteredProducts, null, 2), "utf-8");

            return filteredProducts;
        } catch (error) {
            throw new Error("Error al eliminar el producto" + error);
        }
    }

    async getProductById (productId) {
        try {
            //recuperar productos
            const fileData = await fs.readFile(this.pathFile, "utf-8");
            const products = JSON.parse(fileData);

            const product = products.find(product => product.id === productId);
            return product;
        } catch (error) {
            throw new Error("Error al obtener el producto" + error);
        }
    }
}

export default ProductManager;