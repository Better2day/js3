const path = require('path');
const express = require('express');
const morgan = require('morgan');
require('@dotenvx/dotenvx').config(); // 환경 변수 이용
const index = require('./routes/index'); // Router
// const users = require('./routes/users');
// const stores = require('./routes/stores');
// const items = require('./routes/items');
// const orders = require('./routes/orders');
// const orderitems = require('./routes/orderitems');

const app = express();
const PORT = process.env.PORT || 3000;


// Middleware
app.use(express.static('public'));
app.use(morgan('dev'));

// Middleware - Routing
app.use('/', index);
// API router도 index router 안에 통합RR
// app.use('/api/users', users);
// app.use('/api/stores', stores);
// app.use('/api/items', items);
// app.use('/api/orders', orders);
// app.use('/api/orderitems', orderitems);


app.listen(PORT, () => {
  console.log(`Server is running on ${process.env.URL}:${PORT}`);
});
