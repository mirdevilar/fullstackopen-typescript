export type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export enum Gender {
  Female = 'female',
  Male = 'male',
  Other = 'other',
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface Discharge {
  date: string;
  criteria: string;
}

export interface SickLeave {
  startDate: string;
  endDate: string;
}

export type EntryType = 'Hospital' | 'OccupationalHealthcare' | 'HealthCheck';

export interface BaseEntry {
  date: string;
  description: string;
  id: string;
  specialist: string;
  type: EntryType;
  diagnosisCodes?: Array<Diagnosis['code']>
}

interface HealthCheckEntry extends BaseEntry {
  healthCheckRating: HealthCheckRating;
  type: 'HealthCheck';
}

interface HospitalEntry extends BaseEntry {
  discharge?: Discharge;
  type: 'Hospital';
}

interface OccupationalHealthcareEntry extends BaseEntry {
  employerName: string;
  sickLeave?: SickLeave;
  type: 'OccupationalHealthcare';
}

export type Entry = HealthCheckEntry | HospitalEntry | OccupationalHealthcareEntry;

export interface Patient {
  entries: Entry[];
  gender: Gender;
  id: string;
  name: string;
  occupation: string;
  dateOfBirth?: string;
  ssn?: string;
}

export type NewPatient = Omit<Patient, 'id'>;
export type NewEntry = UnionOmit<Entry, 'id'>;

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;
