import { Alert, Button, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
import { EntryType, HealthCheckRating, NewEntry } from "../types";
import { parseNewEntry } from "../utils/addEntryForm_parsers";
import { isNumber } from "../utils/typeGuards";

interface Props {
  addEntry: (newEntry: NewEntry) => void,
}

const AddEntryForm = ({ addEntry }: Props) => {
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState('');

  const [type, setType] = useState<EntryType | ''>('HealthCheck');
  const [healthCheckRating, setHealthCheckRating] = useState('');
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');
  const [employerName, setEmployerName] = useState('');
  const [sickLeaveStart, setSickLeaveStart] = useState('');
  const [sickLeaveEnd, setSickLeaveEnd] = useState('');

  const showErrorMessage = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const newEntryToAdd = {
        description,
        date,
        specialist,
        diagnosisCodes,
        type,
        healthCheckRating,
        discharge: { 
          date: dischargeDate,
          criteria: dischargeCriteria
        },
        employerName,
        sickLeave: {
          startDate: sickLeaveStart,
          endDate: sickLeaveEnd,
        }
      };

      addEntry(parseNewEntry(newEntryToAdd));

      setShow(false);
      
      setDescription('');
      setDate('');
      setSpecialist('');
      setDiagnosisCodes('');
      setType('');
      setHealthCheckRating('');
      setDischargeDate('');
      setDischargeCriteria('');
      setEmployerName('');
      setSickLeaveStart('');
      setSickLeaveEnd('');
    } catch (error) {
      let msg = 'Invalid input. ';
      if (error instanceof Error) {
        msg += `Error: ${error.message}`;
      }
      showErrorMessage(msg);
    }
  };

  if (show) {
    return (
      <div style={style}>
        <h3>Add new entry</h3>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          /><br />
          <TextField
            label="Date"
            onChange={(e) => setDate(e.target.value)}
            value={date}
          /><br />
          <TextField
            label="Specialist"
            onChange={(e) => setSpecialist(e.target.value)}
            value={specialist}
          /><br />
          <TextField
            label="Diagnosis codes"
            value={diagnosisCodes}
            onChange={(e) => setDiagnosisCodes(e.target.value)}
          /><br />
          <TextField
            select
            label="Type"
            value={type}
            onChange={e => setType(e.target.value as EntryType)}
          >
            <MenuItem value={"HealthCheck"}>Health check</MenuItem>
            <MenuItem value={"Hospital"}>Hospital</MenuItem>
            <MenuItem value={"OccupationalHealthcare"}>Occupational healthcare</MenuItem>
          </TextField><br />

          {type === 'HealthCheck' &&
            <Select
              label="Health check rating"
              value={healthCheckRating}
              onChange={(e) => setHealthCheckRating(e.target.value)}
            >
              {Object.entries(HealthCheckRating)
                .filter(r => isNumber(r[1]))
                .map(r => {
                  console.log(r);
                  return <MenuItem value={r[1]} key={r[1]}>{r[0]}</MenuItem>;
              })}
            </Select>
          }
          
          {type === 'Hospital' &&
            <div>
              <TextField
                label="Discharge date"
                value={dischargeDate}
                onChange={e => setDischargeDate(e.target.value)}
              />

              {(dischargeDate || dischargeCriteria) &&
                <TextField
                  label="Discharge criteria"
                  value={dischargeCriteria}
                  onChange={e => setDischargeCriteria(e.target.value)}
                />
              }
            </div>
          }

          {type === 'OccupationalHealthcare' &&
            <div>
              <TextField
                label="Employer name"
                value={employerName}
                onChange={e => setEmployerName(e.target.value)}
              /><br />
              
              <TextField
                label="Sick leave start date"
                value={sickLeaveStart}
                onChange={e => setSickLeaveStart(e.target.value)}
              />

              {(sickLeaveStart || sickLeaveEnd) &&
                <TextField
                  label="Sick leave end date"
                  value={sickLeaveEnd}
                  onChange={e => setSickLeaveEnd(e.target.value)}
                />
              }
            </div>
          }

          <Button variant="outlined" onClick={() => setShow(!show)}>Cancel</Button>
          <Button type="submit" variant="contained">Create</Button>
        </form>
      </div>
    );
  } else {
    return (
      <Button variant="contained" onClick={() => setShow(!show)}>{show ? 'Cancel' : 'Add entry'}</Button>
    );
  }
};

const style = {
  backgroundColor: '#e9eef5',
  padding: '5px',
  paddingLeft: '20px',
  borderLeft: '3px solid DodgerBlue',
  marginBottom: '10px'
};

export default AddEntryForm;