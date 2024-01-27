// products.js
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

// Fetch all products
router.get('/', async (req, res) => {
  try {
    const pool = await mssql.connect(sqlConfig);
    const result = await pool.query('SELECT * FROM Products');
    res.json(result.recordset);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Error fetching products' });
  }
});

// Create a new product
router.post('/', async (req, res) => {
  try {
    const { name, price, quantity } = req.body;
    const pool = await mssql.connect(sqlConfig);
    await pool
      .request()
      .input('name', mssql.NVarChar, name)
      .input('price', mssql.Decimal, price)
      .input('quantity', mssql.Int, quantity)
      .query('INSERT INTO Products (Name, Price, Quantity) VALUES (@name, @price, @quantity)');
    res.json({ success: true });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Error creating product' });
  }
});

// Update a product
router.put('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, price, quantity } = req.body;
    const pool = await mssql.connect(sqlConfig);
    await pool
      .request()
      .input('name', mssql.NVarChar, name)
      .input('price', mssql.Decimal, price)
      .input('quantity', mssql.Int, quantity)
      .input('productId', mssql.Int, productId)
      .query('UPDATE Products SET Name = @name, Price = @price, Quantity = @quantity WHERE ProductID = @productId');
    res.json({ success: true });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Error updating product' });
  }
});

// Delete a product
router.delete('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const pool = await mssql.connect(sqlConfig);
    await pool
      .request()
      .input('productId', mssql.Int, productId)
      .query('DELETE FROM Products WHERE ProductID = @productId');
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Error deleting product' });
  }
});

module.exports = router;
