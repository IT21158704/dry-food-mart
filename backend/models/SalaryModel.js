import mongoose from 'mongoose';

const SalarySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'users'
    },
    basic: {
        type: Number,
        required: true,
    },
    attendanceAllowance: {
        type: Number,
        required: true,
    },
    fuelAllowance: {
        type: Number,
        required: true,
    },
    overtime: {
        type: Number,
        required: true,
    },
    totalSalary: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

const SalaryModel = mongoose.model("salaries", SalarySchema);

export default SalaryModel;
