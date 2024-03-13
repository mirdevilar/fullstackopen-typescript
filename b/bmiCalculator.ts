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

console.log(calculateBmi(0, 74))
