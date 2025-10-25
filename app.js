import express from "express";
import { engine } from "express-handlebars";
import connectMongoDB from "./src/config/db.js";
import dotenv from "dotenv";
import __dirname from "./dirname.js";

//Inicializamos las variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT;


app.use(express.json());
app.use(express.static("public"));


//Routes
import productRouter from "./src/routes/products.router.js";
import cartsRouter from "./src/routes/carts.router.js";
import viewsRouter from "./src/routes/views.router.js";

//handlebars
app.engine("handlebars", engine())
app.set("view engine", "handlebars");
app.set("views", __dirname + "/src/views");


// Rutas
app.use("/", viewsRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartsRouter);


connectMongoDB();

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

