import NewDiaryEntryForm from './NewDiaryEntryForm'
import { DiaryEntry } from '../types'
import diariesService from '../services/diariesService'

interface Props {
  entries: DiaryEntry[];
  setEntries: (entries: DiaryEntry[]) => void;
}

const EntryList = ({ entries }: { entries: DiaryEntry[] }) => {
  return (
    <div>
      {entries.map(e =>
        <div key={e.id}>
          <h3>{e.date}</h3>
          <ul>
            <li>{e.weather}</li>
            <li>{e.visibility}</li>
          </ul>
        </div>
      )}
    </div>
  )
}

const DiaryEntriesSection = ({ entries, setEntries }: Props) => {
  const addEntry = (entry: Omit<DiaryEntry, 'id'>) => {
    diariesService.create(entry).then((data) => {
      setEntries(entries.some(e => e.id === data.id)
        ? entries
        : entries.concat(data)
      )
    })
  }

  return (
    <div>
      <h2>Diary entries</h2>
      <NewDiaryEntryForm addEntry={addEntry} />
      <EntryList entries={ entries }/>
    </div>
  )
}

export default DiaryEntriesSection