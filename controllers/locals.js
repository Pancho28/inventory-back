import LocalModel from "../models/locals.js";
import ProductModel from "../models/products.js";

class LocalController {

    constructor() {
    }

    async createLocal(req, res) {
        try {
            const local = await LocalModel.createLocal(req.body);
            res.status(201).json(local);
        } catch (error) {
            res.status(500).json({ message: "Error creating local", error });
        }
    }

    async getLocals(req, res) {
        try {
            const locals = await LocalModel.getLocals()
            res.status(200).json(locals);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error fetching locals", error });
        }
    }

    async getLocalById(req, res) {
        try {
            const local = await LocalModel.getLocalById(req.params.id);
            if (!local) {
                return res.status(404).json({ message: 'Local not found with id ' + req.params.id });
            }
            res.status(200).json(local);
        } catch (error) {
            res.status(500).json({ message: "Error fetching local", error });
        }
    }

    async updateLocal(req, res) {
        try {
            const local = await LocalModel.updateLocal(req.params.id, req.body);
            if (!local) {
                return res.status(404).json({ message: 'Local not found with id ' + req.params.id });
            }
            res.status(200).json(local);
        } catch (error) {
            res.status(500).json({ message: "Error updating local", error });
        }
    }

    async deleteLocal(req, res) {
        try {
            const local = await LocalModel.deleteLocal(req.params.id);
            if (!local) {
                return res.status(404).json({ message: 'Local not found with id ' + req.params.id });
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: "Error deleting local", error });
        }
    }

    async addProduct(req, res) {
        try {
            const local = await LocalModel.getLocalById(req.params.id);
            if (!local) {
                return res.status(404).json({ message: 'Local not found with id ' + req.params.id });
            }
            if (!req.body.productId) {
                return res.status(400).json({ message: 'Product ID is required' });
            }
            const productExists = await ProductModel.getProductById(req.body.productId);
            if (!productExists) {
                return res.status(404).json({ message: 'Product not found with id ' + req.body.productId });
            }
            if (local.products.includes(req.body.productId)) {
                return res.status(400).json({ message: 'Product already exists in local' });

            }
            local.products.push(req.body.productId);
            await local.save();
            res.status(200).json(local);
        } catch (error) {
            res.status(500).json({ message: "Error adding product to local", error });
        }
    }

    async removeProduct(req, res) {
        try {
            const local = await LocalModel.getLocalById(req.params.id);
            if (!local) {
                return res.status(404).json({ message: 'Local not found with id ' + req.params.id });
            }
            if (!req.body.productId) {
                return res.status(400).json({ message: 'Product ID is required' });
            }
            const productExists = await ProductModel.getProductById(req.body.productId);
            if (!productExists) {
                return res.status(404).json({ message: 'Product not found with id ' + req.body.productId });
            }
            if (!local.products.includes(req.body.productId)) {
                return res.status(400).json({ message: 'Product does not exist in local' });

            }
            local.products.pull(req.body.productId);
            await local.save();
            res.status(200).json(local);
        } catch (error) {
            res.status(500).json({ message: "Error removing product from local", error });
        }
    }


}

export default new LocalController();