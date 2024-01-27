// index.js
const express = require('express');
const productsRouter = require('./products');
const ordersRouter = require('./orders');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
