import { DiaryEntry } from '../types'

const DiaryEntries = ({ entries }: { entries: DiaryEntry[] }) => {
  return (
    <div>
      <h2>Diary entries</h2>
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
    </div>
  )
}

export default DiaryEntries