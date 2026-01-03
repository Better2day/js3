const path = require('path');
const express = require('express');
const morgan = require('morgan');
const index = require('./routes/index');
const users = require('./routes/users');
const stores = require('./routes/stores');
// const items = require('./routes/items');
// const orders = require('./routes/orders');
// const orderItems = require('./routes/orderItems');

const app = express();
const PORT = 3000;


// Middleware
app.use(express.static('public'));
app.use(morgan('dev'));

// Middleware - Routing
app.use('/', index); // serves static HTML files for each entities
app.use('/api/users', users);
app.use('/api/stores', stores);
// app.use('/api/items', items);
// app.use('/api/orders', orders);
// app.use('/api/orderitems', orderItems);


app.listen(PORT, () => {
  console.log('Server is running on http://127.0.0.1:3000');
});
