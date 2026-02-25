// import express, { Express } from 'express';
import express, { Express, Request, Response } from 'express';
import path from 'path';
import { guessNumber, targetNumber, IGuessResponse } from './guessnumber';

const app: Express = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.post('/api/game/start', (req: Request, res: Response) => {
  res.json({ message: '게임 시작됨', maxAttempts: 7 });
});

app.post('/api/game/guess', (req: Request, res: Response<IGuessResponse>) => {
  const { guess } = req.body;

  const result = guessNumber(targetNumber, guess);

  res.json(result);
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
