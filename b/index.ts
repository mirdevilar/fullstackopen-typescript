import express from 'express';

const app = express();
const PORT = 3003;

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.listen(PORT, () => {
  console.log(`Express server ready at http://localhost/${PORT}`);
});
