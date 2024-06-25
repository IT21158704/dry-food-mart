import mongoose from 'mongoose';

const AddressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'users'
    },
    address: {
        type: String,
        required: true
    }

}, { timestamps: true });

const AddressModel = mongoose.model("address", AddressSchema);

export default AddressModel;