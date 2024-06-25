import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'users'
    },
    paymentId: {
        type: mongoose.Schema.ObjectId,
        ref: 'payment'
    },
    address: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["active", "completed","pending",""],
        default: "pending"
    },
    items: [
        {
            itemId: {
                type: mongoose.Schema.ObjectId,
                ref: 'items'
            }
        }
    ],
    driverId: {
        type: mongoose.Schema.ObjectId,
        ref: 'users',
        default: null
    },

}, { timestamps: true });

const OrderModel = mongoose.model("order", OrderSchema);

export default OrderModel;