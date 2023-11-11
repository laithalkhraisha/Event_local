const express = require('express');
const router = express.Router();



const userRoutes = require('./users_route');
const event_route = require('./event_route');
const contact_route = require('./contact_route');
const category_route = require('./category_route');
const commints_route = require('./commints_route');
const favourite_route = require('./favourite_route');





router.use('/users',userRoutes);
router.use('/event',event_route);
router.use('/contact',contact_route);
router.use('/category',category_route);
router.use('/commints',commints_route);
router.use('/favourite',favourite_route);





module.exports = router;