import initPatients from '../../data/patients';
import { parseNewPatient } from '../utils/parsers/patient';
import { Entry, Patient, NonSensitivePatient } from '../types';
import { filterNonSensitive } from '../utils/parsers/patient';
import { generateId } from '../utils/utils';
import { parseNewEntry } from '../utils/parsers/entry';

let patients = initPatients;

const getAll = (): NonSensitivePatient[] => {
  return patients.map((p) => filterNonSensitive(p));
};

const getById = (id: string): NonSensitivePatient | undefined => {
  return patients.find((p) => p.id === id);
};

const create = (patientToCreate: unknown): Patient => {
  const newPatient = parseNewPatient(patientToCreate);
  const patient = { ...newPatient, id: generateId() } as Patient;
  patients.push(patient);

  return patient;
};

const createEntry = (entryToCreate: unknown, patientId: string): Entry => {
  if (!patients.find(p => p.id === patientId)) {
    throw new Error('No such patient!');
  }

  const newEntry = parseNewEntry(entryToCreate);
  const entry = { ...newEntry, id: generateId() } as Entry;
  patients = patients.map(p => p.id === patientId ? { ...p, entries: p.entries.concat(entry) } : p);
  console.log(patients[3]);
  // console.log(patients.find(p => p.id === patientId));

  return entry;
};

export default { getAll, create, getById, createEntry };
