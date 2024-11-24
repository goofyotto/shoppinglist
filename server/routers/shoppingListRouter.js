const express = require('express');
const ShoppingListController = require('../controller/shoppingListController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create', verifyToken, ShoppingListController.createList);
router.get('/get/:id', verifyToken, ShoppingListController.getList)
router.get('/list', verifyToken, ShoppingListController.listList);
router.post('/update/:id', verifyToken, ShoppingListController.updateList);
router.delete('/delete/:id', verifyToken, ShoppingListController.deleteList);

module.exports = router;