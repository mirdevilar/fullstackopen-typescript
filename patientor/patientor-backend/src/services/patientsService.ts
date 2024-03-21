import patients from '../../data/patients';
import { parseNewPatient } from '../utils/parsers';
import { Patient, NonSensitivePatient } from '../types';
import { generateId } from '../utils/utils';

const getAll = (): NonSensitivePatient[] => {
  return patients.map(({ ssn: _ssn, ...safeData }) => safeData);
};

const create = (patientToCreate: unknown): Patient => {
  const patient = parseNewPatient(patientToCreate) as Patient;
  patient.id = generateId();
  patients.push(patient);
  return patient;
};

export default { getAll, create };
