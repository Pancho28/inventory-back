import express from "express";
import ProductController from "../controllers/products.js";

const route = express.Router();

route.post("/", ProductController.createProduct);
route.get("/", ProductController.getProducts);
route.get("/:id", ProductController.getProductById);
route.put("/:id", ProductController.updateProduct);
route.delete("/:id", ProductController.deleteProduct);
route.get("/locals/:localId", ProductController.getProductsByLocal);

export default route;
