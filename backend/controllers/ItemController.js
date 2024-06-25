import ItemModel from "../models/ItemModel.js";

export const createProduct = async (req, res) => {

    const { itemName, category, price, quantity, img } = req.body;
    try {
        const newItem = await ItemModel.create({
            itemName, 
            category,
            price, 
            quantity,
            img
        });

        return res.status(201).json(newItem);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getAllProducts = async (req, res) => {
    try {
        const Products = await ItemModel.find()

        res.status(200).json(Products);
    } catch (error) {
        res.status(500).json({
            message: error.mesasge
        })
    }
}

export const getOne = async (req, res) => {
    try {
        const id = req.params.id;
        const Products = await ItemModel.findById(id)
        res.status(200).json(Products);
    } catch (error) {
        res.status(500).json({
            message: error.mesasge
        })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            throw Error("Id can't be empty");
        }

        const deletedSub = await ItemModel.findByIdAndDelete(id);
        res.status(200).json({ message: 'Product Deleted Successfully', item:deletedSub });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const Data = req.body;

        if (!id) {
            throw Error("Id can't be empty");
        }

        const updatedProduct = await ItemModel.findByIdAndUpdate( id, Data );
        res.status(200).json({ message: 'Product Updated Successfully', item: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}