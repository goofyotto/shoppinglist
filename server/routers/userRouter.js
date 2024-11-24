const express = require('express');
const userController = require('../controller/userController');
const verifyToken = require('../middleware/authMiddleware.js');

const router = express.Router();

router.post('/create', userController.createUser);
router.get('/get/:id', verifyToken, userController.getUser);
router.get('/list', verifyToken, userController.listUser);
router.post('/update/:id', verifyToken, userController.updateUser);
router.delete('/delete/:id', verifyToken, userController.deleteUser);
router.post('/login', userController.loginUser);

module.exports = router;