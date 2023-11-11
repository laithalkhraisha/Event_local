const express = require('express');
const contactUsController = require('../Controllers/contactController');

const router = express.Router();


router.get('/getall', contactUsController.getAllContacts);
router.post('/add', contactUsController.createContact);


module.exports = router;
