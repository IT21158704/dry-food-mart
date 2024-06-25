import OrderGoodsModel from "../models/OrderGoods.js";
import SupplierModel from "../models/SupplierModel.js";


//localhost:5000/supplier/
export const createSupplier = async (req, res) => {
    const { companyName, name, mobile, email, address, pDescription } = req.body;

    // Check if required fields are provided
    if (!companyName || !name || !mobile || !email || !address || !pDescription) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        // Create a new supplier using the SupplierModel
        const newItem = await SupplierModel.create({
            companyName,
            name,
            mobile,
            email,
            address,
            pDescription
        });

        // Return the newly created supplier
        return res.status(201).json(newItem);
    } catch (error) {
        // Handle database errors
        console.error("Error creating supplier:", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};


export const createOrder = async (req, res) => {
    const {
        sendTo,
        item,
        quentity
    } = req.body;

    try {
        const Mail = await OrderGoodsModel.create({
            sendTo,
            item,
            quentity
        });

        return res.status(201).json(Mail);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

//localhost:5000/supplier/
export const getAllOrders = async (req, res) => {
    try {
        const Supplierss = await OrderGoodsModel.find()
        .populate({
            path: 'item',
            model: 'items'  
        });

        res.status(200).json(Supplierss);
    } catch (error) {
        res.status(500).json({
            message: error.mesasge
        })
    }
}

//localhost:5000/supplier/
export const getAllSupplierss = async (req, res) => {
    try {
        const Supplierss = await SupplierModel.find()

        res.status(200).json(Supplierss);
    } catch (error) {
        res.status(500).json({
            message: error.mesasge
        })
    }
}



//localhost:5000/supplier/661e29de5d9c7bab6d248368
export const getOne = async (req, res) => {
    try {
        const id = req.params.id;
        const Supplierss = await SupplierModel.findById(id)
        res.status(200).json(Supplierss);
    } catch (error) {
        res.status(500).json({
            message: error.mesasge
        })
    }
}



//localhost:5000/supplier/661e29de5d9c7bab6d248368
export const deleteSupplier = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            throw Error("Id can't be empty");
        }

        const deletedSub = await SupplierModel.findByIdAndDelete(id);
        res.status(200).json({ message: 'Supplier Deleted Successfully', item:deletedSub });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



//localhost:5000/supplier/661e29de5d9c7bab6d248368
export const updateSupplier = async (req, res) => {
    try {
        const id = req.params.id;
        const Data = req.body;

        if (!id) {
            throw Error("Id can't be empty");
        }

        const updatedSuppliers = await SupplierModel.findByIdAndUpdate( id, Data );
        res.status(200).json({ message: 'Supplier Updated Successfully', item: updatedSuppliers });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}