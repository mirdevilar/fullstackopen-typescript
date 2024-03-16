import express from 'express';
import _ from 'lodash';

import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

const app = express();
const PORT = 3003;

app.use(express.json());

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

  // const relevArgs = args.slice(2).map(a => Number(a)); // remove args that dont correspond to this program
  //
  // if (relevArgs.length < 2) throw new Error('Not enough arguments!');
  // if (relevArgs.some(a => _.isNaN(a))) throw new Error('All arguments must be numerical!');
  //
  // const [target, ...hoursInDays] = relevArgs;
  //
  // return { hoursInDays, target };

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const params = req.body;

  if (!('daily_exercises' in params) || !('target' in params)) {
    return res.status(400).json({ error: 'parameters missing' });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (!Array.isArray(params.daily_exercises)) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
  const hoursInDays: number[] = params.daily_exercises.map((x: any) => Number(x));
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const target: number = Number(params.target);

  if (Number.isNaN(target) || hoursInDays.some(x => Number.isNaN(x))) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const result = calculateExercises(hoursInDays, target);
  return res.json(result);
});

app.listen(PORT, () => {
  console.log(`Express server ready at http://localhost/${PORT}`);
});
