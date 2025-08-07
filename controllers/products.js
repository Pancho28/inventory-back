import ProductModel from "../models/products.js";
import LocalModel from "../models/locals.js";

class ProductController {

    constructor() {
    }

    async createProduct(req, res) {
        try {
            const product = await ProductModel.createProduct(req.body);
            res.status(201).json(product);
        } catch (error) {
            res.status(500).json({ message: "Error creating product", error });
        }
    }

    async getProducts(req, res) {
        try {
            const products = await ProductModel.getProducts()
            res.status(200).json(products);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error fetching products", error });
        }
    }

    async getProductById(req, res) {
        try {
            const product = await ProductModel.getProductById(req.params.id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found with id ' + req.params.id });
            }
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ message: "Error fetching product", error });
        }
    }

    async updateProduct(req, res) {
        try {
            const product = await ProductModel.updateProduct(req.params.id, req.body);
            if (!product) {
                return res.status(404).json({ message: 'Product not found with id ' + req.params.id });
            }
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ message: "Error updating product", error });
        }
    }

    async deleteProduct(req, res) {
        try {
            const product = await ProductModel.deleteProduct(req.params.id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found with id ' + req.params.id });
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: "Error deleting product", error });
        }
    }

    async getProductsByLocal(req, res) {
        try {
            const local = await LocalModel.getLocalById(req.params.localId);
            if (!local) {
                return res.status(404).json({ message: 'Local not found with id ' + req.params.localId });
            }
            const products = [];
            for (const productId of local.products) {
                const product = await ProductModel.getProductById(productId);
                if (product) {
                    products.push(product);
                }
            }
            if (products.length === 0) {
                return res.status(404).json({ message: 'No products found for local with id ' + local._id });
            }
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: "Error fetching products by local", error });
        }
    }

}

export default new ProductController();