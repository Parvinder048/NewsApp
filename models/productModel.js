const mongoose = require("mongoose");

let productSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        maxLength: 30,
        required: true
    },
    category: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },

    price: {
        type: String,
        required: true
    },
    discryption: {
        type: String,
        minLength: 10,
        maxLength: 100,
        required: true
    }
})

let Products = mongoose.model("product", productSchema)

module.exports = Products