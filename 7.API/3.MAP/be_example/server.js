const path = require('path');
const express = require('express');
const morgan = require('morgan');

const { getSeoulPopulationData } = require('./seoul');

const app = express();
const PORT = 3000;

app.use(morgan('dev'));

app.use(express.static('public'));

app.get('/api/seoul', (req, res) => {
  const seoulData = getSeoulPopulationData();
  res.json(seoulData);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
