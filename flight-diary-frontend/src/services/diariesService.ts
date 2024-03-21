import axios from 'axios'

import { DiaryEntry } from '../types'

const baseUrl = 'http://localhost:3000/api/diaries/'

const getAll = async () => {
  const res = await axios.get<DiaryEntry[]>(baseUrl)
  return res.data
}

const create = async (entry: Omit<DiaryEntry, 'id'>) => {
  const res = await axios.post<DiaryEntry>(baseUrl, entry)
  return res.data
}

export default { getAll, create }