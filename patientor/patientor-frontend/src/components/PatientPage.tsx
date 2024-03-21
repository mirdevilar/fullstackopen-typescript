import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import patientService from '../services/patients';
import { Patient } from "../types";

const PatientPage = () => {
  const id = useParams().id as string;

  const [patient, setPatient] = useState<Patient | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    patientService.getById(id)
      .then((data) => {
        setPatient(data);
      })
      .catch(() => {});
  }, []);

  if (!patient) {
    return <h2>Patient not found!</h2>;
  }

  return (
    <div>
      <p>{error}</p>
      <h2>{patient.name}</h2>
      <ul>
        <li>Gender: {patient.gender}</li>
        <li>Date of birth: {patient.dateOfBirth}</li>
        <li>SSN: {patient.ssn}</li>
        <li>Occupation: {patient.occupation}</li>
      </ul>
    </div>
  );
};

export default PatientPage;