require('dotenv').config();
const express = require('express');
const db = require('./db');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const handleDbQuery = (sql, params, res, successMessage) => {
    db.query(sql, params, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            res.status(500).json({ message: 'Database error', error: err });
        } else {
            res.json(successMessage || results);
        }
    });
};

// Get all products list
app.get('/products', (req, res) => {
    handleDbQuery("SELECT * FROM products", [], res);
});


// Add to cart (insert or update quantity);
app.post('/cart', (req, res) => {
    const { product_id } = req.body;
    
    db.query("SELECT * FROM cart_items WHERE product_id = ?", [product_id], (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error', error: err });
        if (results.length > 0) {
            handleDbQuery(
                "UPDATE cart_items SET quantity = quantity + 1 WHERE product_id = ?",
                [product_id],
                res,
                { message: 'Item quantity updated in cart' }
            );
        } else {
            handleDbQuery(
                "INSERT INTO cart_items (product_id, quantity) VALUES (?, 1)",
                [product_id],
                res,
                { message: 'Item added to cart' }
            );
        }
    });
});


// Get cart items with product details
app.get('/cart', (req, res) => {
    const sql = `
        SELECT 
            ci.cart_item_id,
            p.product_id,
            p.name,
            p.price,
            ci.quantity,
            (p.price * ci.quantity) AS subtotal
        FROM cart_items ci
        INNER JOIN products p ON ci.product_id = p.product_id;
    `;
    handleDbQuery(sql, [], res);
});



// Clear the entire cart
app.delete('/cart', (req, res) => {
    handleDbQuery("DELETE FROM cart_items", [], res, { message: 'Cart cleared successfully!' });
});

// Get all categories
app.get('/categories', (req, res) => {
    const sql = `SELECT * FROM categories`;
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching categories:', err);
            return res.status(500).json({ message: 'Error fetching categories' });
        }
        res.json(results);
    });
});

// Get all colors
app.get('/colors', (req, res) => {
    const sql = `SELECT * FROM colors`;
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching colors:', err);
            return res.status(500).json({ message: 'Error fetching colors' });
        }
        res.json(results);
    });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
