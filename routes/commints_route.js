const express = require('express');
const commintsController = require('../Controllers/commintsController');

const router = express.Router();

router.post('/getall', commintsController.getAllCommints);
router.post('/add',commintsController.createCommint);
router.put('/update',commintsController.updateCommint);
router.put('/delete', commintsController.deleteCommint);

module.exports = router;
