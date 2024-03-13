const _ = require('lodash')

interface ExerciseReport {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface Rating {
  rating: number;
  ratingDescription: string;
}

const rate = (average: number, target: number): Rating => {
  const coef = average / target

  if (coef >= 1) {
    return { rating: 3, ratingDescription: 'excellent! passed the goal' }
  }
  if (coef >= 0.7) {
    return { rating: 2, ratingDescription: 'not bad, almost reached the goal, keep trying!' }
  }
  return { rating: 1, ratingDescription: 'excellent! passed the goal' }
}

const calculateExercises = (hoursInDays: number[], target: number): unknown => {
  const periodLength = hoursInDays.length
  const trainingDays = hoursInDays.reduce((days, hours) => hours > 0 ? days+1 : days, 0)
  const average = _.mean(hoursInDays)
  const success = average >= target

  const { rating, ratingDescription } = rate(average, target)

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
