import patients from '../../data/patients';
import { parseNewPatient } from '../utils/parsers';
import { Patient, NonSensitivePatient } from '../types';
import { filterNonSensitive } from '../utils/parsers';
import { generateId } from '../utils/utils';

const getAll = (): NonSensitivePatient[] => {
  return patients.map((p) => filterNonSensitive(p));
};

const getById = (id: string): NonSensitivePatient | undefined => {
  return patients.find((p) => p.id === id);
};

const create = (patientToCreate: unknown): Patient => {
  const patient = parseNewPatient(patientToCreate) as Patient;
  patient.id = generateId();
  patients.push(patient);
  return patient;
};

export default { getAll, create, getById };
