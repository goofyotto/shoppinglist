const dataBase = require('./db/db.js');
const express = require('express');
const dotenv = require('dotenv');
const shoppingListRouter = require('./routers/shoppingListRouter.js')
const userRouter = require('./routers/userRouter.js')
const bodyParser = require("body-parser")

const app = express();
app.use(express.json());
dotenv.config();
const PORT = process.env.PORT;
dataBase();

// 127.0.0.1:3000/shoppinglist/
app.use(bodyParser.json())
app.use('/shoppinglist', shoppingListRouter);
app.use('/user', userRouter);

app.listen(PORT, (error) => {
    if (!error) {
        console.log("Server is Successfully Running on port", PORT)
    }
    else {
        console.log("Error occurred, server can't start", error);
    }
}
);