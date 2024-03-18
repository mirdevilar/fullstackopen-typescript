import { v1 as uuid } from 'uuid';

export const generateId = (): string => {
  return uuid();
};