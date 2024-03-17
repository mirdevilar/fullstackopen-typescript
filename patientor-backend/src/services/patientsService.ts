import patients from '../../data/patients';
import { NonSensitiveDiagnosis } from '../types';

const getAll = (): NonSensitiveDiagnosis[] => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return patients.map(({ ssn, ...safeData }) => safeData);
};

export default { getAll };
