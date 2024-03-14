import express from 'express';
import _ from 'lodash';

import calculateBmi from './bmiCalculator';

const app = express();
const PORT = 3003;

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const query = req.query;

  if (!query.height) return res.status(400).json({ error: 'Height is missing!' });
  if (!query.weight) return res.status(400).json({ error: 'Weight is missing!' });

  const height = Number(query.height);
  const weight = Number(query.weight);

  if ([height, weight].some(x => _.isNaN(x))) {
    return res.status(400).json({ error: 'Values must be numerical!' });
  }

  const bmi = calculateBmi(height, weight);

  return res.json({ weight, height, bmi });
});

app.listen(PORT, () => {
  console.log(`Express server ready at http://localhost/${PORT}`);
});
