import FavoriteModel from "../models/favoriteModel.js";

export const createFavorite = async (req, res) => {
    const userId = req.loggedInId;
    const  itemId = req.params.id;
    
    try {
        const newFavorite = await FavoriteModel.create({
            userId,
            itemId
        });

        return res.status(201).json(newFavorite);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getFavorites = async (req, res) => {
    const userId = req.loggedInId;

    try {
        // Fetch marks data with populated student details based on the subject ID
        const favoritesData = await FavoriteModel.find({ userId: userId });
        res.status(200).json({ favoritesData });
    } catch (error) {
        console.error('Error fetching Stores data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const removeFavorite = async (req, res) => {
    try {
      const id = req.params.id;
  
      const removedFavorite = await FavoriteModel.findByIdAndDelete(id);
  
      if (!removedFavorite) {
        return res.status(404).json({ error: "Not found" });
      }
      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

  
export const createNewsFavorite = async (req, res) => {
    const userId = req.loggedInId;
    const  newsId = req.params.id;
    
    try {
        const newFavorite = await FavoriteModel.create({
            userId,
            newsId
        });

        return res.status(201).json(newFavorite);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
