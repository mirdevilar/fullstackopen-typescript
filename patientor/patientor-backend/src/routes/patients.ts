import express from 'express';

import { parseId } from '../utils/parsers/patient';
import patientsService from '../services/patientsService';
import { Patient } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(patientsService.getAll());
});

router.post('/', (req, res) => {
  try {
    const createdPatient: Patient = patientsService.create(req.body);
    res.json(createdPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong... ';
    if (error instanceof Error) {
      errorMessage += 'Error: ' + error.message;
    }
    res.send(errorMessage);
  }
});

router.get('/:id', (req, res) => {
  try {
    const id = parseId(req.params.id);
    const match = patientsService.getById(id);
    if (!match) {
      res.status(404).json({ error: 'Not found' });
    }
    res.json(match);
  } catch (error) {
    let msg = 'Something went wrong... ';
    if (error instanceof Error) {
      msg += 'Error: ' + error.message;
    }
    res.send(msg);
  }
});

router.post('/:id/entries', (req, res) => {
  console.log('pooped');
  try {
    const patientId = parseId(req.params.id);
    const createdEntry = patientsService.createEntry(req.body, patientId);
    res.json(createdEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong... ';
    if (error instanceof Error) {
      errorMessage += `Error: ${error.message}`;
    }
    res.send(errorMessage);
  }
});


export default router;
