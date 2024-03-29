import { Diagnosis, Discharge, EntryType, HealthCheckRating, NewEntry, SickLeave } from '../../types';
import { isDate, isEntryType, isHealthCheckRating, isNumber, isString } from '../typeGuards';

// FIELD PARSERS

const parseCriteria = (input: unknown): string => {
  if (!input || !isString(input)) {
    throw new Error('Invalid criteria or missing altogether!');
  }

  return input;
};

const parseDate = (input: unknown): string => {
  if (!input || !isString(input) || !isDate(input)) {
    throw new Error('Invalid date or missing altogether!');
  }

  return input;
};

const parseDescription = (input: unknown): string => {
  if (!input || !isString(input)) {
    throw new Error('Invalid description or missing altogether!');
  }

  return input;
};

const parseDiagnosisCodes = (input: unknown): Array<Diagnosis['code']> =>  {
  if (!input || typeof input !== 'object' || !('diagnosisCodes' in input)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return input.diagnosisCodes as Array<Diagnosis['code']>;
};

const parseDischarge = (input: unknown): Discharge => {
  if (!input || typeof input !== 'object') {
    throw new Error('Hospital discharge field is not an object or is missing altogether!');
  }

  if (!('date' in input) || !('criteria' in input)) {
    throw new Error('Hospital discharge is missing properties!');
  }
  const output = {
    date: parseDate(input.date),
    criteria: parseCriteria(input.criteria),
  };

  return output;
};

const parseEmployerName = (input: unknown): string => {
  if (!input || !isString(input)) {
    throw new Error('Employer name is missing or invalid!');
  }

  return input;
};

const parseEntryType = (input: unknown): EntryType => {
  if (!input || !isString(input) || !isEntryType(input)) {
    throw new Error('Type is not one of the valid options or is missing altogether!');
  }

  return input;
};

const parseHealthCheckRating = (input: unknown): HealthCheckRating => {
  if (input === undefined || !isNumber(input) || !isHealthCheckRating(input)) {
    throw new Error('Health check rating is missing or invalid!');
  }
  console.log('bogus binted');

  return input;
};

const parseSickLeave = (input: unknown): SickLeave => {
  if (!input || typeof input !== 'object') {
    throw new Error('Sick leave is not an object or is missing!');
  }

  if (!('startDate' in input && 'endDate' in input)) {
    throw new Error('Sick leave is missing properties!');
  }

  const output = {
    startDate: parseDate(input.startDate),
    endDate: parseDate(input.endDate),
  };

  return output; 
};

const parseSpecialist = (input: unknown): string => {
  if (!input || !isString(input)) {
    throw new Error('Invalid specialist field or missing altogether!');
  }

  return input;
};

// ENTRY PARSER

export const parseNewEntry = (input: unknown): NewEntry => {
  if (!input || typeof input !== 'object') {
    throw new Error('Input missing or not an object!');
  }

  let entry = {};

  const hasBaseProps = 
    'date' in input &&
    'description' in input &&
    'specialist' in input &&
    'type' in input;

  if (hasBaseProps) {
    entry = {
      date: parseDate(input.date),
      description: parseDescription(input.description),
      specialist: parseSpecialist(input.specialist),
      type: parseEntryType(input.type),
      diagnosisCodes: 'diagnosisCodes' in input ? parseDiagnosisCodes(input.diagnosisCodes) : undefined,
    };

    switch (input.type) {
      case 'HealthCheck':
        if (!('healthCheckRating' in input)) {
          throw new Error('"healthCheckRating" field expected for entry of type "HealthCheck"');
        }

        entry = {
          ...entry,
          healthCheckRating: parseHealthCheckRating(input.healthCheckRating),
        };

        break;
      case 'Hospital':
        if (!('discharge' in input)) {
          throw new Error('"Discharge" field expected for entry of type "Hospital"');
        }

        entry = {
          ...entry,
          discharge: parseDischarge(input.discharge),
        };

        break;
      case 'OccupationalHealthcare':
        if (!('employerName' in input)) {
          throw new Error('"employerName" expected in entry of type "OccupationalHealthcare"');
        }
        
        entry = {
          ...entry,
          employerName: parseEmployerName(input.employerName),
          sickLeave: 'sickLeave' in input ? parseSickLeave(input.sickLeave) : undefined,
        };

        break;
      default:
        break;
    }

  }

  return entry as NewEntry;
};