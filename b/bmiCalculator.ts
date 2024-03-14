import _ from 'lodash';

interface Values {
  height: number;
  weight: number;
}

const calculateBmi = (height: number, weight: number): string => {
  if (height <= 0) {
    throw new Error('Invalid height!');
  }

  const bmi: number = weight / ((height / 100) ** 2);

  if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi < 25) {
    return 'Normal (healthy weight)';
  } else {
    return 'Overweight';
  }
};

const parseArguments = (args: string[]): Values => {
  const relevArgs = args.slice(2).map(a => Number(a));

  if (relevArgs.length < 2) throw new Error('Not enough arguments!');
  if (relevArgs.length > 2) throw new Error('Too many arguments!');
  if (relevArgs.some(a => _.isNaN(a))) throw new Error('Values must be numbers!');

  const [height, weight] = relevArgs;
  
  return { height, weight };
};

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong... ';
  if (error instanceof Error) {
    errorMessage += 'Error: ' + error.message;
  }
  console.log(errorMessage);
}
