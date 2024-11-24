const userModel = require("../modeles/userModel.js");
const jwt = require('jsonwebtoken');

// 127.0.0.1/user/get/1234 (1234 je id)
const getUser = async (req, res) => {
    const { id } = req.params;
    console.log("Connection.. ", id)
    try {
        const user = await userModel.findById(id)
        return res.status(200).send(user);
    } catch (error) {
        return res.status(500).send(error)
    }
};

const listUser = async (req, res) => {
    const { id } = req.params
    try {
        const shoppingUser = await userModel.find();
        return res.status(200).json(shoppingUser)
    } catch (error) {
        return res.status(500).send('Internal Server Error - ', error)
    }
};

const createUser = async (req, res) => {
    const User = req.body;
    try {
        const newUser = new userModel({
            ...User
        });

        const savedUser = newUser.save();
        return res.status(200).send(newUser);
    } catch (error) {
        return res.status(500).send(error)
    }
};

// 127.0.0.1:3000/user/update/:id
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { password, admin } = req.body;
    try {
        const databaseUser = await userModel.findById(
            id
        );
        databaseUser.password = password;
        databaseUser.admin = admin;
        const updatedUser = await databaseUser.save();
        return res.status(200).send(databaseUser);
    } catch (error) {
        return res.status(500).send(error)
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await userModel.findByIdAndDelete(id);
        return res.status(200).send(deletedUser);
    } catch (error) {
        return res.status(500).send(error)
    };
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await userModel.findOne({ username });
        if (!user) {
            return res.status(401).send('Authentication failed');
        }
        if (password === user.password) {
            const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '7D' });
            console.log(token);
            res.status(200).json({ username, token });
        } else {
            return res.status(401).send('Authentication failed');
        }
    } catch (error) {
        return res.status(500).send(error)
    };
};




module.exports = { getUser, listUser, createUser, updateUser, deleteUser, loginUser }