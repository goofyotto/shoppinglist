const mongoShoppingList = require("../modeles/shoppingListModel.js");

// 127.0.0.1/shoppinglist/get/1234 (1234 je id)
const getList = async (req, res) => {
    const { id } = req.params;
    const shoppingList = await mongoShoppingList.findById(id);

    return res.status(200).json(shoppingList);
};

const listList = async (req, res) => {
    try {
        const shoppingList = await mongoShoppingList.find();
        return res.status(200).send(shoppingList)
    } catch (error) {
        return res.status(500).send(error)
    }
};

const createList = async (req, res) => {
    const list = req.body;
    try {
        const shoppingList = new mongoShoppingList({
            ...list
        });

        const savedList = shoppingList.save();
        return res.status(200).json(shoppingList);
    } catch (error) {
        return res.status(500).send('Internal Server Error - ', error)
    }
};

// 127.0.0.1:3000/shoppinglist/update/:id
const updateList = async (req, res) => {
    const { id } = req.params;
    const list = req.body;
    try {
        const updatedShoppingList = await mongoShoppingList.findByIdAndUpdate(
            id,
            {
                ...list,
            }
        );
        return res.status(200).json(list);
    } catch (error) {
        return res.status(500).send('Internal Server Error - ', error)
    }
};

const deleteList = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedShoppingList = await mongoShoppingList.findByIdAndDelete(id);
        return res.status(200).json(deletedShoppingList);
    } catch (error) {
        return res.status(500).send('Internal Server Error - ', error)
    };
};




module.exports = { getList, listList, createList, updateList, deleteList };