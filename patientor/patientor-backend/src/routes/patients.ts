import express from 'express';

import patientsService from '../services/patientsService';
import { Patient } from '../types';
import { parseId } from '../utils/parsers';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(patientsService.getAll());
});

router.post('/', (_req, res) => {
  try {
    const createdPatient: Patient = patientsService.create(_req.body);
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
      res.status(400).json({ error: 'Not found' });
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

export default router;
