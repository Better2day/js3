const path = require('path');
const router = require('express').Router();

// Routers
router.get('/', (req, res) => {
  res.redirect('/users');
});

router.get('/users', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'users.html'));
});

router.get('/stores', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'stores.html'));
});

router.get('/items', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'items.html'));
});

router.get('/orders', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'orders.html'));
});

router.get('/orderitems', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'orderitems.html'));
});

module.exports = router;
