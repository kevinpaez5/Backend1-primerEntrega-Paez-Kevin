import "dotenv/config";
import express from "express";
import { engine } from "express-handlebars";
import connectMongoDB from "./src/config/db.js";
import __dirname from "./dirname.js";
import passport from "passport";
import { initializePassport } from "./src/config/passport.config.js";
import mocksRouter from "./src/routes/mocks.router.js";
import petsRouter from "./src/routes/pets.router.js";

const app = express();
const PORT = process.env.PORT;


app.use(express.json());
app.use(express.static("public"));


//Routes
import productRouter from "./src/routes/products.router.js";
import cartsRouter from "./src/routes/carts.router.js";
import viewsRouter from "./src/routes/views.router.js";
import usersRouter from "./src/routes/user.router.js";
import sessionsRouter from "./src/routes/sessions.router.js";
import passwordRouter from "./src/routes/password.router.js";

//handlebars
app.engine("handlebars", engine())
app.set("view engine", "handlebars");
app.set("views", __dirname + "/src/views");


// Rutas
app.use("/", viewsRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/users", usersRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/api/password", passwordRouter);
app.use("/api/mocks", mocksRouter);
app.use("/api/pets", petsRouter);


//Inicializamos passport
initializePassport();
app.use(passport.initialize());


connectMongoDB();

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

