import CartModel from "../models/CartModel.js";

export const createCart = async (req, res) => {
    const userId = req.loggedInId;
    const  itemId = req.params.id;
    const quantity = 1;
    
    try {
        const newCart = await CartModel.create({
            userId,
            itemId,
            quantity
        });

        return res.status(201).json(newCart);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getCart = async (req, res) => {
    const userId = req.loggedInId;

    try {
        // Fetch marks data with populated student details based on the subject ID
        const Data = await CartModel.find({ userId: userId })
        .populate({
            path: 'itemId',
            model: 'items'  
        });
        res.status(200).json({ Data });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const removeCart = async (req, res) => {
    try {
      const id = req.params.id;
  
      const removedCart = await CartModel.findByIdAndDelete(id);
  
      if (!removedCart) {
        return res.status(404).json({ error: "Not found" });
      }
      return res.status(204).send("Successfully deleted");
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

  export const removeAllCart = async (req, res) => {
      try {
        const userId = req.loggedInId;
    
        const removedCart = await CartModel.deleteMany({ userId });
        if (!removedCart) {
          return res.status(404).json({ error: "Not found" });
        }
        return res.status(204).send("Successfully deleted");
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    };