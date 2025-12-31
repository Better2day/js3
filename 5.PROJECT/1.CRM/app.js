const path = require('path');
const express = require('express');
const morgan = require('morgan');
const users = require('./routes/users');
const stores = require('./routes/stores');
const items = require('./routes/items');
const orders = require('./routes/orders');
const orderItems = require('./routes/orderItems');

const app = express();
const PORT = 3000;


// Middleware
app.use(express.static('public'));
app.use(morgan('dev'));

// Middleware - Routing
app.use('/users', users);
app.use('/stores', stores);
app.use('/items', items);
app.use('/orders', orders);
app.use('/orderitems', orderItems);


// Routing
app.get('/', (req, res) => {
  res.redirect('/users');
});


app.listen(PORT, () => {
  console.log('Server is running on http://127.0.0.1:3000');
});
