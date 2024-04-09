import { Diagnosis, Discharge, EntryType, HealthCheckRating, NewEntry, SickLeave } from "../types";
import { isDate, isEntryType, isHealthCheckRating, isNumber, isString } from "./typeGuards";

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
  if (!input) {
    throw new Error('Health check rating is missing');
  }

  if (isString(input)) {
    input = Number(input);
  }

  if (!isNumber(input) || !isHealthCheckRating(input)) {
    throw new Error('Health check rating is missing or invalid!');
  }

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

// date and specialist parsing missing

// export const parseDate = (input: string): string => {
//   if (!input || !isDate(input)) {
//     throw new Error('Date invalid or empty!');
//   }
//
//   return input;
// };
//
// export const parseDescription = (input: string): string => {
//   if (!input || input.length < 5) {
//     throw new Error('Description cannot be empty or shorter than 5 characters!');
//   }
//
//   return input;
// };
//
// export const parseDiagnosisCodes = (input: string): Array<Diagnosis['code']> => {
//   if (!input) {
//     throw new Error('Diagnosis codes field is empty!');
//   }
//
//   return input.split(', ');
// };
//
// export const parseHealthCheckRating = (input: string): HealthCheckRating => {
//   if (!input) {
//     throw new Error('Health check rating must have a value!');
//   }
//
//   const intValue = parseInt(input);
//
//   console.log(`int value: ${intValue}`);
//   console.log(`is nan? ${Number.isNaN(intValue)}`);
//   console.log(`is hcr? ${isHealthCheckRating(intValue)}`);
//   
//   if (Number.isNaN(intValue) || !isHealthCheckRating(intValue)) {
//     throw new Error('Health check rating must have a numeric value between 0 and 3!');
//   }
//
//   return intValue;
// };
//
// export const parseSpecialist = (input: string): string => {
//   if (!input) {
//     throw new Error('Specialist cannot be empty!');
//   }
//
//   return input;
// };
//
// export const parseType = (input: unknown): EntryType => {
//   if (!input) {
//     throw new Error('A type must be selected!');
//   }
//
//   return input as EntryType;
// };

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

// export const parseNewEntry = (input: unknown): NewEntry => {
//   if (!input || typeof input !== 'object') {
//     throw new Error('Entry object empty or invalid!');
//   }
//   
//   let output = {
//     description: parseDescription(input.description),
//     date: parseDate(input.date),
//     specialist: parseSpecialist(input.specialist),
//     diagnosisCodes: parseDiagnosisCodes(input.diagnosisCodes),
//     type: parseType(input.type),
//     healthCheckRating: parseHealthCheckRating(input.healthCheckRating),
//   };
// };