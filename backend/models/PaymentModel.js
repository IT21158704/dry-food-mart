import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'users'
    },
    price: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cardNo: {
        type: Number,
        required: true
    },
    mm: {
        type: Number,
        required: true
    },
    yy: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    }

}, { timestamps: true });

const PaymentModel = mongoose.model("payment", PaymentSchema);

export default PaymentModel;