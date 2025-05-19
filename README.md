Use your local DB connection host, username, password, port = 5000

Databse name = ecommerce_db

// MYSQL DATABASE SETUP 

CREATE DATABASE ecommerce_db;
USE ecommerce_db;

// Categories Table
CREATE TABLE categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

// Colors Table
CREATE TABLE colors (
    color_id INT AUTO_INCREMENT PRIMARY KEY,
    color_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

 // Products Table
CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

// Product Colors (Many-to-Many Relationship)
CREATE TABLE product_colors (
    product_id INT,
    color_id INT,
    PRIMARY KEY (product_id, color_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    FOREIGN KEY (color_id) REFERENCES colors(color_id)
);

// Cart Table
CREATE TABLE carts (
    cart_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

// Cart Items
CREATE TABLE cart_items (
    cart_item_id INT AUTO_INCREMENT PRIMARY KEY,
    cart_id INT,
    product_id INT,
    quantity INT DEFAULT 1,
    FOREIGN KEY (cart_id) REFERENCES carts(cart_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

// Orders Table
CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(10,2),
    status VARCHAR(50) DEFAULT 'Pending'
);

// Order Items Table
CREATE TABLE order_items (
    order_item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT,
    price DECIMAL(10,2),
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

// For Sample Data run below query.

//category

INSERT INTO categories (name) VALUES 
    ('Electronics'), 
    ('Clothing'), 
    ('Home Appliances'), 
    ('Furniture'), 
    ('Sports & Outdoors'), 
    ('Books'), 
    ('Beauty & Personal Care'), 
    ('Toys & Games'), 
    ('Automotive'), 
    ('Groceries'), 
    ('Footwear'), 
    ('Accessories');

//colors

INSERT INTO colors (color_name) VALUES 
    ('Red'), 
    ('Blue'), 
    ('Green'), 
    ('Black'), 
    ('White'), 
    ('Yellow'), 
    ('Purple'), 
    ('Orange'), 
    ('Pink'), 
    ('Brown'), 
    ('Grey'), 
    ('Silver'), 
    ('Gold');

// products

INSERT INTO products (name, description, price, category_id) VALUES 
    ('Laptop', 'High-performance laptop for work and gaming', 1099.99, 1),
    ('Headphones', 'Noise-canceling over-ear headphones', 199.99, 1),
    ('Smartwatch', 'Stylish smartwatch with fitness tracking', 299.99, 1),
    ('Jacket', 'Warm, waterproof winter jacket', 79.99, 2),
    ('Jeans', 'Classic blue denim jeans', 49.99, 2),
    ('Blender', 'Powerful blender for smoothies and shakes', 129.99, 3),
    ('Microwave Oven', 'Compact microwave with auto-cook functions', 199.99, 3),
    ('Sofa', 'Comfortable three-seater fabric sofa', 599.99, 4),
    ('Dining Table', 'Modern wooden dining table', 399.99, 4),
    ('Tent', 'Waterproof camping tent for 4 people', 159.99, 5),
    ('Basketball', 'Official size and weight basketball', 29.99, 5),
    ('Novel', 'Bestselling mystery novel', 14.99, 6),
    ('Cookbook', 'Easy and delicious home cooking recipes', 24.99, 6),
    ('Shampoo', 'Natural, sulfate-free hair shampoo', 12.99, 7),
    ('Lipstick', 'Long-lasting matte lipstick', 19.99, 7),
    ('Toy Car', 'Remote-controlled racing car', 49.99, 8),
    ('Puzzle', '1000-piece jigsaw puzzle', 29.99, 8),
    ('Car Vacuum', 'Portable, high-suction car vacuum cleaner', 59.99, 9),
    ('Motor Oil', 'Synthetic motor oil for high-performance engines', 39.99, 9),
    ('Pasta', 'Premium Italian pasta', 2.99, 10),
    ('Chocolate', 'Rich dark chocolate bar', 4.99, 10),
    ('Running Shoes', 'Lightweight, breathable running shoes', 89.99, 11),
    ('Watch', 'Elegant wristwatch with leather strap', 149.99, 12),
    ('Sunglasses', 'Stylish UV-protected sunglasses', 79.99, 12);



1. Start the nodeJS server using node server.js in path --> Ecommerce/ecommerce-backend/
2. Start the web server using npm start in path --> Ecommerce/ecommerce-frontend/
3. To test the logical codings run -> node logicalTest.ja in path --> Ecommerce/ecommerce-backend/