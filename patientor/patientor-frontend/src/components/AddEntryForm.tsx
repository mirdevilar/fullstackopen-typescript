import { Alert, Button, TextField } from "@mui/material";
import { useState } from "react";
import { parseDate, parseDescription, parseDiagnosisCodes, parseHealthCheckRating, parseSpecialist } from "../utils/addEntryForm_parsers";
import { NewEntry } from "../types";

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
  const [healthCheckRating, setHealthCheckRating] = useState('');

  const showErrorMessage = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      addEntry({
        description: parseDescription(description),
        date: parseDate(date),
        specialist: parseSpecialist(specialist),
        type: 'HealthCheck', // implement other types
        diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
        healthCheckRating: parseHealthCheckRating(healthCheckRating),
      });

      setShow(false);
      
      setDescription('');
      setDate('');
      setSpecialist('');
      setDiagnosisCodes('');
      setHealthCheckRating('');
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
            label="Health check rating"
            onChange={(e) => setHealthCheckRating(e.target.value)}
            value={healthCheckRating}
          /><br />

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