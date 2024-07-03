const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

let items = [];

app.get('/api/items', (req, res) => {
    res.json(items);
});

app.post('/api/items', (req, res) => {
    const item = req.body;
    items.push(item);
    res.json(item);
});

app.put('/api/items/:id', (req, res) => {
    const { id } = req.params;
    const updatedItem = req.body;
    items = items.map(item => item.id === id ? updatedItem : item);
    res.json(updatedItem);
});

app.delete('/api/items/:id', (req, res) => {
    const { id } = req.params;
    items = items.filter(item => item.id !== id);
    res.json({ message: 'Item deleted' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
