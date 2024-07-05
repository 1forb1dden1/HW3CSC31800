const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Product = require('./Models/productModel');  // Import the Product model

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.get('/api/items', async (req, res) => {
    try {
        const items = await Product.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/items', async (req, res) => {
    const { name, quantity } = req.body;
    const newItem = new Product({ name, quantity });

    try {
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.put('/api/items/:id', async (req, res) => {
    const { id } = req.params;
    const { name, quantity } = req.body;

    try {
        const updatedItem = await Product.findByIdAndUpdate(
            id,
            { name, quantity },
            { new: true, runValidators: true }
        );
        if (!updatedItem) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.delete('/api/items/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedItem = await Product.findByIdAndDelete(id);
        if (!deletedItem) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

mongoose.connect('mongodb+srv://KEVINTESTING:wnLGX7pDGnT0zifK@cluster0.ol9fksg.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
        console.log('connected to mongoDB');
    }).catch(() => {
        console.log('error');
    });
