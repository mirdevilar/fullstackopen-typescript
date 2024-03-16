import express from 'express';

const PORT = process.env.NODE_ENV === 'production'
  ? 3000
  : 3003;
const baseUrl = '/api/';

const app = express();

app.get(baseUrl + 'ping', (_req, res) => {
  console.log('pinged');
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server is ready at http://localhost:${PORT}`);
});
