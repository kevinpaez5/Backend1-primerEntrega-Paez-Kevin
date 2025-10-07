import express from "express";
import { engine } from "express-handlebars";
import http from "http";
import { Server } from "socket.io";
import ProductManager from "./src/managers/productManager.js";

const app = express();
app.use(express.json());
app.use(express.static("public"));

const server = http.createServer(app);
const io = new Server(server);

//Routes
import productsRouter from "./src/routes/products.router.js";
import cartsRouter from "./src/routes/carts.router.js";
import viewsRouter from "./src/routes/views.router.js";

//handlebars
app.engine("handlebars", engine())
app.set("view engine", "handlebars");
app.set("views", "./src/views");


//endpoints
app.use("/", viewsRouter);

app.get("/", (req, res) => {
    res.send("Hello World!");
}); 

// Rutas
app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

// websockets
const productManager = new ProductManager("./src/data/products.json");
io.on("connection", (socket) => {
    socket.on("newProduct", async(productData) => {
        try {
           const newProduct = await productManager.addProduct(productData);
           io.emit('productAdded', newProduct);
        } catch (error) {
            console.error('Error al añadir el producto', error);
        }
    });

    socket.on("deleteProduct", async(productId) => {
        try {
            await productManager.deleteProductById(productId);
            io.emit("productDeleted", productId); // avisamos a todos que se borró
        } catch (error) {
            console.error("Error al eliminar producto", error);
        }
    });
});

server.listen(8080, () => {
    console.log("Servidor escuchando en http://localhost:8080");
});

