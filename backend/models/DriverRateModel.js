import mongoose from 'mongoose';

const DriverRateSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'users'
    },
    driverId: {
        type: mongoose.Schema.ObjectId,
        ref: 'users'
    },
    rate: {
        type: Number,
        required: true
    },

}, { timestamps: true });

const DriverRateModel = mongoose.model("driverrates", DriverRateSchema);

export default DriverRateModel;