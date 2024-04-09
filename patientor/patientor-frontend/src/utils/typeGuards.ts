import { EntryType, HealthCheckRating } from "../types";

export const isDate = (input: string): boolean => {
  return Boolean(Date.parse(input));
};

export const isEntryType = (input: string): input is EntryType => {
  return ["HealthCheck", "Hospital", "OccupationalHealthcare"].includes(input);
};

export const isNumber = (input: unknown): input is number => {
  return typeof input === 'number' && !isNaN(input);
};

export const isHealthCheckRating = (input: number): input is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(input);
};

export const isString = (input: unknown): input is string => {
  return typeof input === 'string';
};