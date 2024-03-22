export type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

interface Discharge {
  date: string;
  criteria: string;
}

interface SickLeave {
  startDate: string;
  endDate: string;
}

export type EntryType = 'Hospital' | 'OccupationalHealthcare' | 'HealthCheck';

interface BaseEntry {
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
  id: string;
  entries: Entry[];
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;