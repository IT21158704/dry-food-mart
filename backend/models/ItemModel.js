import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
    itemName: {
        type: String,
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    img: {
        type: String,
        required: true,
    }

}, { timestamps: true });

const ItemModel = mongoose.model("items", ItemSchema);

export default ItemModel;