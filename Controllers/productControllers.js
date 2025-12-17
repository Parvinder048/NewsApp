const Products = require("../models/productModel");

// ✅ GET all products
const getAllProducts = async (req, res) => {
    try {
        const data = await Products.find();
        return res.status(200).send(data); // 200 OK
    } catch (error) {
        return res.status(500).send({ message: "Server error", error });
    }
};

// ✅ ADD a new product
const addedProduct = async (req, res) => {
    try {
        const data = req.body;

        const existingProduct = await Products.findOne({ category: data.category });
        if (existingProduct) {
            return res.status(409).send({ message: "Product already exists" }); // 409 Conflict
        }

        const newProduct = await Products.create(data);
        return res.status(201).send(newProduct); // 201 Created
    } catch (error) {
        return res.status(500).send({ message: "Server error", error });
    }
};

// ✅ UPDATE a product
const updatedProduct = async (req, res) => {
    try {
        const id = req.query.id;
        const data = req.body;

        const updatedProduct = await Products.findByIdAndUpdate(id, data, { new: true });

        if (!updatedProduct) {
            return res.status(404).send({ message: "No product found to update" }); // 404 Not Found
        }

        return res.status(200).send(updatedProduct); // 200 OK
    } catch (error) {
        return res.status(500).send({ message: "Server error", error });
    }
};

// ✅ DELETE a product
const deletedProduct = async (req, res) => {
    try {
        const id = req.query.id;

        const deletedProduct = await Products.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).send({ message: "No product found to delete" }); // 404 Not Found
        }

        return res.status(200).send({ message: "Product deleted successfully" }); // 200 OK
    } catch (error) {
        return res.status(500).send({ message: "Server error", error });
    }
};

module.exports = { getAllProducts, addedProduct, updatedProduct, deletedProduct };
