import { Gender, NewPatient } from '../types';

const enumIncludesString = (obj: object, str: string): boolean => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return
  return Object.values(obj).map(v => v.toString()).includes(str);

};

const isString = (input: unknown): input is string => {
  return typeof input === 'string';
};

const isDate = (input: string): boolean => {
  return Boolean(Date.parse(input));
};

const isGender = (input: string): input is Gender => {
  // upgrade to enum
  return enumIncludesString(Gender, input);
};

// const parseId = (input: unknown): string => {
//   if (!input || !isString(input)) {
//     throw new Error('Invalid or missing id!');
//   }
//
//   return input;
// };

const parseName = (input: unknown): string => {
  if (!input || !isString(input)) {
    throw new Error('Invalid or missing name!');
  }

  return input;
};

const parseDoB = (input: unknown): string => {
  if (!input || !isString(input) || !isDate(input)) {
    throw new Error('Invalid or missing date of birth!');
  }

  return input;
};

const parseSSN = (input: unknown): string => {
  if (!input || !isString(input)) {
    throw new Error('Invalid or missing social security number!');
  }

  return input;
};

const parseGender = (input: unknown): Gender => {
  if (!input || !isString(input) || !isGender(input)) {
    throw new Error('Invalid or missing gender!');
  }

  return input;
};

const parseOccupation = (input: unknown): string => {
  if (!input || !isString(input)) {
    throw new Error('Invalid or missing occupation!');
  }

  return input;
};

export const parseNewPatient = (input: unknown): NewPatient => {
  if (!input || typeof input !== 'object') {
    throw new Error('Input missing or not an object!');
  }

  // if (['name', 'dateOfBirth', 'ssn', 'gender', 'occupation'].every(key => key in input)) {
  if (
    'name' in input &&
    'dateOfBirth' in input &&
    'ssn' in input &&
    'gender' in input &&
    'occupation' in input
  ) {
    const newPatient: NewPatient = {
      name: parseName(input.name),
      dateOfBirth: parseDoB(input.dateOfBirth),
      ssn: parseSSN(input.ssn),
      gender: parseGender(input.gender),
      occupation: parseOccupation(input.occupation),
    };
    return newPatient;
  }

  throw new Error('Invalid input, some properties are missing!');
};