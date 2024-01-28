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
  console.log('Connected to MySQL database from orders.js');
});

// CRUD operations using MySQL

// Create a new order
const createOrder = (customerName, items, totalOrderPrice) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO orders (customerName, items, totalOrderPrice) VALUES (?, ?, ?)';
    connection.query(query, [customerName, items, totalOrderPrice], (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results.insertId); // Return the ID of the newly inserted order
    });
  });
};

// Read all orders
const getAllOrders = () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM orders', (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results);
    });
  });
};

// Update an existing order
const updateOrder = (orderId, customerName, items, totalOrderPrice) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE orders SET customerName = ?, items = ?, totalOrderPrice = ? WHERE id = ?';
    connection.query(query, [customerName, items, totalOrderPrice, orderId], (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results.affectedRows > 0); // Return true if the order was updated successfully
    });
  });
};

// Delete an order
const deleteOrder = (orderId) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM orders WHERE id = ?';
    connection.query(query, [orderId], (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results.affectedRows > 0); // Return true if the order was deleted successfully
    });
  });
};

// Export CRUD functions
module.exports = {
  createOrder,
  getAllOrders,
  updateOrder,
  deleteOrder
};