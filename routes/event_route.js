const express = require('express');
const eventController = require('../Controllers/eventController');

const router = express.Router();
const multer = require("multer");
const path = require("path");



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,'images'); // Adjust the destination folder as needed
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });



router.get('/getevents', eventController.getAllEvents);
router.get('/event', eventController.getEventById);
router.post('/add', upload.single('image'), eventController.createEvent);
router.post('/update',upload.single('image'), eventController.updateEvent);
router.put('/delete', eventController.deleteEvent);

module.exports = router;
