import mongoose from "mongoose";
import Local from "../schemas/locals.js";

class LocalModel {

    async createLocal(local) {
        return await Local.create(local)
    } 

    async getLocals() {
        return await Local.find();
    }

    async getLocalById(id) {
        return await Local.findById(id);
    }

    async updateLocal(id, local) {
        return await Local.findByIdAndUpdate({ _id: new mongoose.Types.ObjectId(id)}, local, { new: true });
    }

    async deleteLocal(id) {
        return await Local.findByIdAndDelete({ _id: new mongoose.Types.ObjectId(id)});
    }

}

export default new LocalModel();