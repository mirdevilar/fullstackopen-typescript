import { Diagnosis, Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from '../types';

const lang = {
  healthCheckRating: ['Healthy', 'Low risk', 'High risk', 'Critical risk']
};

interface Props {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const HealthCheckDetails = ({ entry }: { entry: HealthCheckEntry }) => {
  return (
    <>
      <p>Health status: <b>{lang.healthCheckRating[entry.healthCheckRating]}</b></p>
    </>
  );
};

const HospitalDetails = ({ entry }: { entry: HospitalEntry }) => {
  return (
    <>
      {entry.discharge &&
        <p><b>Discharged</b> on {entry.discharge.date}. Reason: {entry.discharge.criteria}</p>
      }
    </>
  );
};

const OccupationalHealthcareDetails = ({ entry }: { entry: OccupationalHealthcareEntry }) => {
  return (
    <>
      <p>Employer: {entry.employerName}</p>
      {entry.sickLeave &&
        <p><b>Sick leave</b> from {entry.sickLeave.startDate} to {entry.sickLeave.endDate}</p>
      }
    </>
  );
};

const Details = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case 'HealthCheck':
      return <HealthCheckDetails entry={entry} />;
    case 'Hospital':
      return <HospitalDetails entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareDetails entry={entry} />;
    default:
      break;
  }
};

const EntryElement = ({ entry, diagnoses }: Props) => {
  return (
    <div key={entry.id} style={style}>
      <p><b>{entry.date} - {entry.type} entry</b> by {entry.specialist}</p>
      <p><i>{entry.description}</i></p>

      {'diagnosisCodes' in entry &&
        <div>
          <p><b>Diagnosis codes:</b></p>
          <ul>
            {entry.diagnosisCodes?.map(code =>
              <li key={code}>{code} {diagnoses && diagnoses.find(d => d.code === code)?.name}</li>
            )}
          </ul>
        </div>
      }
      
      <Details entry={entry} />
    </div>
  );
};

const style = {
  backgroundColor: '#e9eef5',
  padding: '5px',
  paddingLeft: '20px',
  borderLeft: '3px solid DodgerBlue',
  marginBottom: '10px'
};

export default EntryElement;