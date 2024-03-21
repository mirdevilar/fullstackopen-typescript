export enum Gender {
  Female = 'female',
  Male = 'male',
  Other = 'other',
}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

// eslint-disable-next-line 
// interface Entry {
//
// }

export interface Patient {
  dateOfBirth: string;
  // entries: Entry[];
  gender: Gender;
  id: string;
  name: string;
  occupation: string;
  ssn: string;
}

export type NewPatient = Omit<Patient, 'id'>;

export type NonSensitivePatient = Omit<Patient, 'ssn'>;
