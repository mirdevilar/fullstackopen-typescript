import { Entry, EntryType, Gender, NewPatient, NonSensitivePatient, Patient } from '../types';

const enumIncludesString = (obj: object, str: string): boolean => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return
  return Object.values(obj).map(v => v.toString()).includes(str);

};

const isDate = (input: string): boolean => {
  return Boolean(Date.parse(input));
};

const isEntryType = (input: string): input is EntryType => {
  return ["HealthCheck", "Hospital", "OccupationalHealthcare"].includes(input);
};

const isGender = (input: string): input is Gender => {
  return enumIncludesString(Gender, input);
};

const isString = (input: unknown): input is string => {
  return typeof input === 'string';
};

export const parseId = (input: unknown): string => {
  if (!input || !isString(input)) {
    throw new Error('Invalid or missing id!');
  }

  return input;
};


const parseDoB = (input: unknown): string => {
  if (!input || !isString(input) || !isDate(input)) {
    throw new Error('Invalid or missing date of birth!');
  }

  return input;
};

const parseEntries = (input: unknown): Entry[] => {
  // implement
  if (!input || !Array.isArray(input)) {
    throw new Error('Invalid entries property!');
  }

  input.forEach((e) => {
    if (!('type' in e)) {
      throw new Error('Entry type expected!');
    }
    
    if (!isString(e.type) || !isEntryType(e.type as string)) {
      throw new Error('Entry type invalid!');
    }
  });

  return [];
}; 

const parseGender = (input: unknown): Gender => {
  if (!input || !isString(input) || !isGender(input)) {
    throw new Error('Invalid or missing gender!');
  }

  return input;
};

const parseName = (input: unknown): string => {
  if (!input || !isString(input)) {
    throw new Error('Invalid or missing name!');
  }

  return input;
};

const parseOccupation = (input: unknown): string => {
  if (!input || !isString(input)) {
    throw new Error('Invalid or missing occupation!');
  }

  return input;
};

const parseSSN = (input: unknown): string => {
  if (!input || !isString(input)) {
    throw new Error('Invalid or missing social security number!');
  }

  return input;
};

export const parseNewPatient = (input: unknown): NewPatient => {
  if (!input || typeof input !== 'object') {
    throw new Error('Input missing or not an object!');
  }

  if (
    'name' in input &&
    'dateOfBirth' in input &&
    'ssn' in input &&
    'gender' in input &&
    'occupation' in input
  ) {
    const newPatient: NewPatient = {
      dateOfBirth: parseDoB(input.dateOfBirth),
      entries: 'entries' in input ? parseEntries(input.entries) : [],
      gender: parseGender(input.gender),
      name: parseName(input.name),
      occupation: parseOccupation(input.occupation),
      ssn: parseSSN(input.ssn),
    };
    return newPatient;
  }

  throw new Error('Invalid input, some properties are missing!');
};

export const filterNonSensitive = (patient: Patient): NonSensitivePatient => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { ssn, entries, ...filteredData } = patient;
  return filteredData;
};
