import AddressModel from "../models/AddressModel.js";

export const createAddress = async (req, res) => {
    const userId = req.loggedInId;
    const {
        address
    } = req.body;

    try {
        const newAddress = await AddressModel.create({
            userId,
            address
        });

        return res.status(201).json(newAddress);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getAddress = async (req, res) => {
    const userId = req.loggedInId;

    try {
        const addressData = await AddressModel.find({ userId: userId });
        res.status(200).json({ addressData });
    } catch (error) {
        console.error('Error fetching Stores data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const removeAddress = async (req, res) => {
    try {
      const id = req.params.id;
  
      const removedCart = await AddressModel.findByIdAndDelete(id);
  
      if (!removedCart) {
        return res.status(404).json({ error: "Not found" });
      }
      return res.status(204).send("Successfully deleted");
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };


  export const updateAddress = async (req, res) => {
    try {
        const id = req.params.id;
        const Data = req.body;

        if (!id) {
            throw Error("Id can't be empty");
        }

        const updatedAddress = await AddressModel.findByIdAndUpdate( id, Data );
        res.status(200).json({ message: 'Updated Successfully', item: updatedAddress });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}