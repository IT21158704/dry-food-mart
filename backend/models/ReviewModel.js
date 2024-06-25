import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
    userId: {
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

const ReviewModel = mongoose.model("review", ReviewSchema);

export default ReviewModel;