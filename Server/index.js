const express = require('express');
const products = require('./products'); // Import products.js
const orders = require('./orders'); // Import orders.js

const app = express();
const port = 3000;

app.get('/products', async (req, res) => {
  try {
    const productList = await products.getAllProducts();
    res.json(productList);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/orders', async (req, res) => {
  try {
    const orderList = await orders.getAllOrders();
    res.json(orderList);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
