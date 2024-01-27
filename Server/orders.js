// orders.js
const express = require('express');
const mssql = require('mssql');
const router = express.Router();
require('dotenv').config();

// SQL Server configuration
const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
};

// Middleware to parse JSON bodies
router.use(express.json());

// Fetch all orders
router.get('/', async (req, res) => {
  try {
    const pool = await mssql.connect(sqlConfig);
    const result = await pool.query('SELECT * FROM Orders');
    res.json(result.recordset);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Error fetching orders' });
  }
});

// Create a new order
router.post('/', async (req, res) => {
  try {
    // Implement create order functionality here
    res.json({ success: true });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Error creating order' });
  }
});

// Update an order
router.put('/:id', async (req, res) => {
  try {
    // Implement update order functionality here
    res.json({ success: true });
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ error: 'Error updating order' });
  }
});

// Delete an order
router.delete('/:id', async (req, res) => {
  try {
    // Implement delete order functionality here
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ error: 'Error deleting order' });
  }
});

module.exports = router;
