import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import EntryElement from './EntryElement';
import patientService from '../services/patients';
import { Diagnosis, Patient } from "../types";

interface Props {
  diagnoses: Diagnosis[];
}

const PatientPage = ({ diagnoses }: Props) => {
  const id = useParams().id as string;
  const navigate = useNavigate();

  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    patientService.getById(id)
      .then((data) => {
        setPatient(data);
      })
      .catch(() => {
        navigate('/');
      });
  }, []);

  if (!patient) {
    return <h2>Patient not found!</h2>;
  }

  return (
    <div>
      <h2>{patient.name}</h2>
      <ul>
        <li>Gender: {patient.gender}</li>
        <li>Date of birth: {patient.dateOfBirth}</li>
        <li>SSN: {patient.ssn}</li>
        <li>Occupation: {patient.occupation}</li>
      </ul>

      {patient.entries.length > 0 &&
        <div>
          <h3>Entries</h3>
          {patient.entries.map(e =>
            <EntryElement entry={e} diagnoses={diagnoses} key={e.id} />
          )}
        </div>
      }
    </div>
  );
};

export default PatientPage;