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
// Example: Fetch all orders from a table named 'orders'
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

// Export the getAllOrders function
module.exports = {
  getAllOrders
};
