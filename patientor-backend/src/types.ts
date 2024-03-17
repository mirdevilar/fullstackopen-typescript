type Date = `${number}-${number}-${number}`;
type Gender = 'female' | 'male' | 'other';
type SSN = `${number}-${number}${string}`;

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: Date;
  ssn: SSN;
  gender: Gender;
  occupation: string;
}

export type NonSensitiveDiagnosis = Omit<Patient, 'ssn'>;

