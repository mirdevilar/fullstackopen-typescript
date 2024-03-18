import patients from '../../data/patients';
import { parsePatient } from '../utils/parsers';
import { Patient, NonSensitivePatient } from '../types';

const getAll = (): NonSensitivePatient[] => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return patients.map(({ ssn, ...safeData }) => safeData);
};

const create = (patientToCreate: unknown): Patient => {
  // I deemed it better to handle type enforcement here in
  // service module to free routes from business logic.
  // Also since I decided to add the ID on parse, migrating
  // to a dedicated database system will not require touching routes. 
  const patient = parsePatient(patientToCreate);
  patients.push(patient);
  return patient;
};

export default { getAll, create };
