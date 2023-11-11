const { Router } = require('express');
const userController = require('../Controllers/userController');
const router = Router();



router.post('/addusers', userController.createUser);
router.put('/update', userController.updateUser);
router.put('/delete', userController.deleteUser);
router.get('/users', userController.getAllUsers);
router.post('/login', userController.loginUser);

module.exports = router;