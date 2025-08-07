import moongoose from 'mongoose';

const LocalSchema = new moongoose.Schema({
    name: {
      type: String,
      required: true
    },
    description: {
    type: String,
    required: true
    },
    owner: {
    type: String,
    required: true
    },
    products: [{
        type: moongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
}, {timestamps: true}
);

export default moongoose.model('local', LocalSchema);