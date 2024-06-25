import mongoose from 'mongoose';

const OrderGoodsSchema = new mongoose.Schema({
    sendTo: {
        type: String,
        required: true,
    },
    item: {
        type: mongoose.Schema.ObjectId,
        ref: 'items'
    },
    quentity: {
        type: String,
        required: true,
    },

}, { timestamps: true });

const OrderGoodsModel = mongoose.model("orderGoods", OrderGoodsSchema);

export default OrderGoodsModel;