import mongoose from "mongoose";
import Product from "../schemas/products.js";

class ProductModel {

    async createProduct(product) {
        return await Product.create(product)
    } 

    async getProducts() {
        return await Product.find();
    }

    async getProductById(id) {
        return await Product.findById(id);
    }

    async updateProduct(id, product) {
        return await Product.findByIdAndUpdate({ _id: new mongoose.Types.ObjectId(id)}, product, { new: true });
    }

    async deleteProduct(id) {
        return await Product.findByIdAndDelete({ _id: new mongoose.Types.ObjectId(id)});
    }

}

export default new ProductModel();