const express = require('express');
const favouriteController = require('../Controllers/favouriteontroller');

const router = express.Router();


router.post('/getall', favouriteController.getAllFavourites);
router.post('/add', favouriteController.createFavourite);
router.delete('/delete', favouriteController.deleteFavourite);

module.exports = router;
