const mongoose = require('mongoose');

const shoppingListSchema = new mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    status: {
        type: Boolean,
        default: true,
    },
    items: [
        {
            name: {
                type: String,
                required: true,
                trim: true,
            },
            status: {
                type: Boolean,
                default: false,
            },
        },
    ],
});

module.exports = mongoose.model('ShoppingList', shoppingListSchema);