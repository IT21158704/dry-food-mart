import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'users'
    },
    itemId: {
        type: mongoose.Schema.ObjectId,
        ref: 'items'
    },
    quantity: {
        type: Number,
        required: true
    }

}, { timestamps: true });

const CartModel = mongoose.model("cart", CartSchema);

export default CartModel;