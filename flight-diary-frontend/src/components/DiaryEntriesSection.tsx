import { useState } from 'react'
import { DiaryEntry, Visibility, Weather } from '../types'

const NewEntryForm = () => {
  const [show, setShow] = useState(false)

  const [date, setDate] = useState('')
  const [visibility, setVisibility] = useState('')
  const [weather, setWeather] = useState('')
  const [comment, setComment] = useState('')

  return (
    <div>
      {show && 
        <div>
          <h3>Add new entry</h3>
          <form>
            <label>date: </label>
            <input 
              onChange={(e) => setDate(e.target.value)}
              type="date"
              value={date}
            />
            <br />

            <label>visibility: </label>
            {Object.keys(Visibility).map((v, i) =>
              <div style={{display: "inline"}}>
                <input
                  checked={visibility === v}
                  id={v}
                  key={i}
                  onChange={(e) => setVisibility(e.target.value)}
                  type="radio"
                  value={v}
                />
                <label htmlFor={v}>{v}</label>
              </div>
            )}
            <br />

            <label>weather: </label>
            {Object.keys(Weather).map((v, i) =>
              <div style={{ display: 'inline' }}>
                <input
                  checked={weather === v}
                  id={v}
                  key={i}
                  onChange={(e) => setWeather(e.target.value)}
                  type="radio"
                  value={v}
                />
                <label htmlFor={v}>{v}</label>
              </div>
            )}
            <br />

            <label>comment: </label>
            <input
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            />
          </form>
        </div>
      }

      {!show && <button onClick={() => setShow(true)}>New entry</button>}
    </div>
  )
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

const DiaryEntriesSection = ({ entries }: { entries: DiaryEntry[] }) => {
  return (
    <div>
      <h2>Diary entries</h2>
      <NewEntryForm />
      <EntryList entries={ entries }/>
    </div>
  )
}

export default DiaryEntriesSection