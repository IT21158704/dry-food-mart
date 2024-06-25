import mongoose from 'mongoose';

const SupplierSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    pDescription: {//product Description
        type: String,
        required: true
    },

}, { timestamps: true });

const SupplierModel = mongoose.model("suppliers", SupplierSchema);

export default SupplierModel;