const mysql = require('mysql');

// MySQL configuration
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Default MySQL username in XAMPP
  password: '', // Default MySQL password in XAMPP (empty by default)
  database: 'storemanagement', // Name of the database you created in phpMyAdmin
});

// Connect to MySQL database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database from products.js');
});

// CRUD operations using MySQL

// Create a new product
const createProduct = (name, price) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO products (name, price) VALUES (?, ?)';
    connection.query(query, [name, price], (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results.insertId); // Return the ID of the newly inserted product
    });
  });
};

// Read all products
const getAllProducts = () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM products', (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results);
    });
  });
};

// Update an existing product
const updateProduct = (productId, name, price) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE products SET name = ?, price = ? WHERE id = ?';
    connection.query(query, [name, price, productId], (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results.affectedRows > 0); // Return true if the product was updated successfully
    });
  });
};

// Delete a product
const deleteProduct = (productId) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM products WHERE id = ?';
    connection.query(query, [productId], (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results.affectedRows > 0); // Return true if the product was deleted successfully
    });
  });
};

// Export CRUD functions
module.exports = {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct
};