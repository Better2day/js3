const path = require('path');
const router = require('express').Router();
const users = require('./users');
const stores = require('./stores');
const items = require('./items');
const orders = require('./orders');
const orderitems = require('./orderitems');

// Routers - static HTML files
router.get('/', (req, res) => {
  res.redirect('/users');
});

router.get('/users', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'users.html'));
});

router.get('/user-detail', (req, res) => {
  console.log('req.query.id: ', req.query.id);
  res.sendFile(path.join(__dirname, '../public', 'user-detail.html'));
});

router.get('/stores', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'stores.html'));
});

router.get('/store-detail', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'store-detail.html'));
});

router.get('/items', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'items.html'));
});

router.get('/item-detail', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'item-detail.html'));
});

router.get('/orders', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'orders.html'));
});

router.get('/order-detail', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'order-detail.html'));
});

router.get('/orderitems', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'orderitems.html'));
});

router.get('/orderitem-detail', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'orderitem-detail.html'));
});

// Routers - API
router.use('/api/users', users);
router.use('/api/stores', stores);
router.use('/api/items', items);
router.use('/api/orders', orders);
router.use('/api/orderitems', orderitems);

module.exports = router;
