const express = require('express');
const categoryController = require('../Controllers/categoryController');

const router = express.Router();

router.get('/getall', categoryController.getAllCategories);
router.post('/add', categoryController.createCategory);
router.put('/update', categoryController.updateCategory);
router.put('/delete', categoryController.deleteCategory);

module.exports = router;
