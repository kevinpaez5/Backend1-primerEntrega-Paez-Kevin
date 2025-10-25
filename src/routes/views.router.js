import express from "express";
import Product from "../models/product.model.js";

const viewsRouter = express.Router();


viewsRouter.get("/", async (req, res) => {
    try {
        const {limit = 10, page= 1} = req.query;

        const data = await Product.paginate({}, {limit, page, lean: true});
        const products = data.docs;
        delete data.docs;

        const links = [];

        for(let index = 1; index < data.totalPages; index ++){
            links.push({text: index, link: `?limit=${limit}&page=${index}`});
        }

        res.render("home", {products, links});
    } catch (error) {
        res.status(500).send({ message: error.message });

    }
})

viewsRouter.get("/realtimeproducts", async (req, res) => {
    try {
        const products = await Product.find();
        res.render("realTimeProducts", {products});
    } catch (error) {
        res.status(500).send({ message: error.message });

    }
})

//ruta para mostrar una pagina con la descripcion del producto selecionado
viewsRouter.get("/products/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await Product.findById(pid).lean();

    if (!product) {
      return res.status(404).render("404", { message: "Producto no encontrado" });
    }

    res.render("productDetail", { product });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});


export default viewsRouter;