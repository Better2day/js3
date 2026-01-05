
import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);

app.listen(3000, () => {
  console.log('CRM backend running at http://localhost:3000');
});
