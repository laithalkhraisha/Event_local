const FavouriteModel = require('../Models/favouriteModel');

class FavouriteController {
  async getAllFavourites(req, res) {
    const {user_id}=req.body
    try {
        
      const favourites = await FavouriteModel.getAllFavourites(user_id);
      res.json(favourites);
    } catch (error) {
      console.error('Error fetching favourites:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  

  async createFavourite(req, res) {
    const { user_id, event_id } = req.body;
    try {
      const newFavourite = await FavouriteModel.createFavourite(user_id, event_id );
      res.status(201).json(newFavourite);
    } catch (error) {
      console.error('Error creating favourite:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  async updateFavourite(req, res) {
    const favouriteId = req.query.id;
    const { user_id, event_id  } = req.body;
    try {
      const updatedFavourite = await FavouriteModel.updateFavourite(favouriteId, user_id, event_id );
      res.json(updatedFavourite);
    } catch (error) {
      console.error('Error updating favourite:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  async deleteFavourite(req, res) {
    const favouriteId = req.query.id;
    try {
      const deletedFavourite = await FavouriteModel.deleteFavourite(favouriteId);
      if (!deletedFavourite) {
        return res.status(404).json({ error: 'Favourite not found' });
      }
      res.json({ message: 'Favourite deleted successfully' });
    } catch (error) {
      console.error('Error deleting favourite:', error);
      res.status(500).send('Internal Server Error');
    }
  }
}

module.exports = new FavouriteController();
