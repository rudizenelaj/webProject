const express = require('express');
const bodyParser = require('body-parser');
const products = require('./products'); // Import products.js
const orders = require('./orders'); // Import orders.js
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

app.use(bodyParser.json());

// Endpoint for creating a new product
app.post('/products', async (req, res) => {
  const { name, price } = req.body;
  try {
    const productId = await products.createProduct(name, price);
    res.status(201).json({ id: productId, message: 'Product created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create product', error: error.message });
  }
});

// Endpoint for getting all products
app.get('/products', async (req, res) => {
  try {
    const allProducts = await products.getAllProducts();
    res.json(allProducts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch products', error: error.message });
  }
});

// Endpoint for updating a product
app.put('/products/:id', async (req, res) => {
  const productId = req.params.id;
  const { name, price } = req.body;
  try {
    const success = await products.updateProduct(productId, name, price);
    if (success) {
      res.json({ message: 'Product updated successfully' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to update product', error: error.message });
  }
});

// Endpoint for deleting a product
app.delete('/products/:id', async (req, res) => {
  const productId = req.params.id;
  try {
    const success = await products.deleteProduct(productId);
    if (success) {
      res.json({ message: 'Product deleted successfully' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete product', error: error.message });
  }
});

// Endpoint for creating a new order
app.post('/orders', async (req, res) => {
  const { customerName, items, totalOrderPrice } = req.body;
  try {
    const orderId = await orders.createOrder(customerName, items, totalOrderPrice);
    res.status(201).json({ id: orderId, message: 'Order created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create order', error: error.message });
  }
});

// Endpoint for getting all orders
app.get('/orders', async (req, res) => {
  try {
    const allOrders = await orders.getAllOrders();
    res.json(allOrders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
  }
});

// Endpoint for updating an order
app.put('/orders/:id', async (req, res) => {
  const orderId = req.params.id;
  const { customerName, items, totalOrderPrice } = req.body;
  try {
    const success = await orders.updateOrder(orderId, customerName, items, totalOrderPrice);
    if (success) {
      res.json({ message: 'Order updated successfully' });
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to update order', error: error.message });
  }
});

// Endpoint for deleting an order
app.delete('/orders/:id', async (req, res) => {
  const orderId = req.params.id;
  try {
    const success = await orders.deleteOrder(orderId);
    if (success) {
      res.json({ message: 'Order deleted successfully' });
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete order', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
