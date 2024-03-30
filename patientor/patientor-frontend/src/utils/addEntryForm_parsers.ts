import { Diagnosis, HealthCheckRating } from "../types";
import { isDate, isHealthCheckRating } from "./typeGuards";

// date and specialist parsing missing

export const parseDate = (input: string): string => {
  if (!input || !isDate(input)) {
    throw new Error('Date invalid or empty!');
  }

  return input;
};

export const parseDescription = (input: string): string => {
  if (!input || input.length < 5) {
    throw new Error('Description cannot be empty or shorter than 5 characters!');
  }

  return input;
};

export const parseDiagnosisCodes = (input: string): Array<Diagnosis['code']> => {
  if (!input) {
    throw new Error('Diagnosis codes field is empty!');
  }

  return input.split(', ');
};

export const parseHealthCheckRating = (input: string): HealthCheckRating => {
  if (!input) {
    throw new Error('Health check rating must have a value!');
  }

  const intValue = parseInt(input);

  console.log(`int value: ${intValue}`);
  console.log(`is nan? ${Number.isNaN(intValue)}`);
  console.log(`is hcr? ${isHealthCheckRating(intValue)}`);
  
  if (Number.isNaN(intValue) || !isHealthCheckRating(intValue)) {
    throw new Error('Health check rating must have a numeric value between 0 and 3!');
  }

  return intValue;
};

export const parseSpecialist = (input: string): string => {
  if (!input) {
    throw new Error('Specialist cannot be empty!');
  }

  return input;
};