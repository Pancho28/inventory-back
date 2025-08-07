import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: [0, "Price must be a positive number"]
    },
    quantity: {
        type: Number,
        required: true,
        min: [0, "Quantity must be a positive number"]
    },
    status: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

export default mongoose.model('Product', ProductSchema);