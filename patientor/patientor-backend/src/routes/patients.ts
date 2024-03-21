import express from 'express';

import patientsService from '../services/patientsService';
import { Patient } from '../types';

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

export default router;
