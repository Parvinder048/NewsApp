const express = require('express');
const userRouter = require('./Routers/userRouter');
const productRouter = require('./Routers/productRouter');
const newsRouter = require('./Routers/newsRouter');
const mongoose = require("mongoose");
const cors = require('cors');
// const errorHandler = require('./Middleware/errorHandler');

const app = express();

app.use(express.json());
app.use(cors());


app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/news", newsRouter);

app.get('/', (req, res) => {
    res.send('server is up!');
});

// app.use(errorHandler);


function errmiddleware(err, req, res, next) {
    res.status(400).json({ errmsg: err.message,
        stack: err.stack
     });
}

app.use(errmiddleware);


mongoose.connect("mongodb+srv://parvinder00031_db_user:QIKyAcRJREb9uMRQ@cluster0.uidhjx0.mongodb.net/?appName=Cluster0")
    .then(() => {
        console.log('connected to mydb3');
    });

app.listen(3001, () => {
    console.log('server is running on http://localhost:3001');
});

