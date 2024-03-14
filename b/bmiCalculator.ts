import _ from 'lodash'

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
    return 'Underweight'
  } else if (bmi < 25) {
    return 'Normal (healthy weight)'
  } else {
    return 'Overweight'
  }
}

const parseArguments = (args: string[]): Values => {
  if (args.length < 4) throw new Error('Not enough arguments!')
  if (args.length > 4) throw new Error('Too many arguments!')

  const height = Number(args[2])
  const weight = Number(args[3])

  if (_.isNaN(height) || _.isNaN(weight)) {
    throw new Error('Values must be numbers!')
  }
  
  return {
    height: Number(args[2]),
    weight: Number(args[3]),
  }
}

try {
  const { height, weight } = parseArguments(process.argv)
  console.log(calculateBmi(height, weight))
} catch (error: unknown) {
  let errorMessage = 'Something went wrong... '
  if (error instanceof Error) {
    errorMessage += 'Error: ' + error.message
  }
  console.log(errorMessage)
}
