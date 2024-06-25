import mongoose from 'mongoose';

const ProductReviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'users'
    },
    productId: {
        type: mongoose.Schema.ObjectId,
        ref: 'users'
    },
    rate: {
        type: Number,
        required: true
    },
    review: {
        type: String,
        required: true
    },

}, { timestamps: true });

const ProductReviewModel = mongoose.model("ProductReview", ProductReviewSchema);

export default ProductReviewModel;