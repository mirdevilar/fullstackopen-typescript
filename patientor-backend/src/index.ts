import express from 'express';
import cors from 'cors';

import diagnosesRouter from './routes/diagnoses';

const PORT = process.env.NODE_ENV === 'production'
  ? 3000
  : 3001;
const baseUrl = '/api/';

const app = express();

app.use(cors());

app.use('/api/diagnoses', diagnosesRouter);

app.get(baseUrl + 'ping', (_req, res) => {
  console.log('pinged');
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server is ready at http://localhost:${PORT}`);
});
