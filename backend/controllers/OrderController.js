import CartModel from "../models/CartModel.js";
import ItemModel from "../models/ItemModel.js";
import OrderModel from "../models/OrderModel.js";
import PaymentModel from "../models/PaymentModel.js";

export const createOrder = async (req, res) => {
    const status = 'pending';
    const {
        items,
        price,
        email,
        cardNo,
        mm,
        yy,
        name,
        address

    } = req.body;
    const userId = req.loggedInId;
    try {
        if (items?.length < 1) {
            throw Error('items array is required for create orders')
        }
        const updateQtyPromises = items.map(async (it) => {
            const item = await ItemModel.findById(it);
            item.quantity -= 1;
            await item.save()

        })

        const isQuntityUpdated =await Promise.all(updateQtyPromises)
        const newPayment = await PaymentModel.create({
            userId,
            price,
            email,
            cardNo,
            mm,
            yy,
            name
        });
        const paymentId = newPayment._id;

        const newOrder = await OrderModel.create({
            userId,
            paymentId,
            status,
            items,
            price,
            address
        });

        return res.status(201).json("Order Complete", newOrder, newPayment);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
};

export const getAllOrders = async (req, res) => {
    try {
        const Orders = await OrderModel.find()
            .populate({
                path: 'items.itemId',
                model: 'items'  
            })
            .populate({
                path: 'userId',
                model: 'users'  
            })
            .populate({
                path: 'driverId',
                model: 'users'  
            })
            .populate({
                path: 'paymentId',
                model: 'payment'  
            });

        res.status(200).json(Orders);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


export const getallByUser = async (req, res) => {
    try {
        const userId = req.loggedInId;
        const Products = await OrderModel.find({ userId: userId })
        .populate({
            path: 'driverId',
            model: 'users'  
        })
        res.status(200).json(Products);
    } catch (error) {
        res.status(500).json({
            message: error.mesasge
        })
    }
}

export const getByDriver = async (req, res) => {
    try {
        const userId = req.loggedInId;
        const Products = await OrderModel.find({ driverId: userId })
        .populate({
            path: 'userId',
            model: 'users'  
        })
        res.status(200).json(Products);
    } catch (error) {
        res.status(500).json({
            message: error.mesasge
        })
    }
}

export const deleteOrder = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            throw Error("Id can't be empty");
        }
        const deletedOrder = await OrderModel.findByIdAndDelete(id);
        const deletedPayment = await PaymentModel.findByIdAndDelete(deletedOrder.paymentId);
        res.status(200).json({ message: 'Order Deleted Successfully', item:deletedPayment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateOrder = async (req, res) => {
    try {
        const id = req.params.id;
        const Data = req.body;

        if (!id) {
            throw Error("Id can't be empty");
        }

        const updatedOrder = await OrderModel.findByIdAndUpdate( id, Data );
        res.status(200).json({ message: 'Order Updated Successfully', item: updatedOrder });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}