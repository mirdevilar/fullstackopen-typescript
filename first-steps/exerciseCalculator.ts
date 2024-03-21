import _ from 'lodash';

interface ExerciseReport {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseParams {
  hoursInDays: number[];
  target: number;
}

interface Rating {
  rating: number;
  ratingDescription: string;
}

const rate = (average: number, target: number): Rating => {
  const coef = average / target;

  if (coef >= 1) {
    return { rating: 3, ratingDescription: 'Excellent! passed the goal' };
  }
  if (coef >= 0.7) {
    return { rating: 2, ratingDescription: 'Not bad, almost reached the goal, keep trying!' };
  }
  return { rating: 1, ratingDescription: 'You are a disappointment, you should be ashamed! (I would never say this to a patient, Terveystalo please let me in)' };
};

const calculateExercises = (hoursInDays: number[], target: number): ExerciseReport => {
  const periodLength = hoursInDays.length;
  const trainingDays = hoursInDays.reduce((days, hours) => hours > 0 ? days+1 : days, 0);
  const average = _.mean(hoursInDays);
  const success = average >= target;

  const { rating, ratingDescription } = rate(average, target);

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

const parseArguments = (args: string[]): ExerciseParams => {
  const relevArgs = args.slice(2).map(a => Number(a)); // remove args that dont correspond to this program

  if (relevArgs.length < 2) throw new Error('Not enough arguments!');
  if (relevArgs.some(a => _.isNaN(a))) throw new Error('All arguments must be numerical!');

  const [target, ...hoursInDays] = relevArgs;

  return { hoursInDays, target };
};

try {
  const { hoursInDays, target } = parseArguments(process.argv);
  console.log(calculateExercises(hoursInDays, target));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong... ';
  if (error instanceof Error) {
    errorMessage += 'Error: ' + error.message;
  }
  console.log(errorMessage);
}

export default calculateExercises;
