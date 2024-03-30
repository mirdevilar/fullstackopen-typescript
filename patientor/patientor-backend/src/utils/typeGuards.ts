import { EntryType, Gender, HealthCheckRating } from '../types';

export const isDate = (input: string): boolean => {
  return Boolean(Date.parse(input));
};

export const isEntryType = (input: string): input is EntryType => {
  return ["HealthCheck", "Hospital", "OccupationalHealthcare"].includes(input);
};

export const isGender = (input: string): input is Gender => {
  return enumIncludesString(Gender, input);
};

export const isHealthCheckRating = (input: number): input is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(input);
};

export const isNumber = (input: unknown): input is number => {
  return typeof input === 'number' && !isNaN(input);
};

export const isString = (input: unknown): input is string => {
  return typeof input === 'string';
};

const enumIncludesString = (obj: object, str: string): boolean => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return
  return Object.values(obj).map(v => v.toString()).includes(str);
};
