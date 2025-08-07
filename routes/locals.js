import express from "express";
import LocalController from "../controllers/locals.js";

const route = express.Router();

route.post("/", LocalController.createLocal);
route.get("/", LocalController.getLocals);
route.get("/:id", LocalController.getLocalById);
route.put("/:id", LocalController.updateLocal);
route.delete("/:id", LocalController.deleteLocal);
route.post("/products/:id", LocalController.addProduct);
route.delete("/products/:id", LocalController.removeProduct);

export default route;
