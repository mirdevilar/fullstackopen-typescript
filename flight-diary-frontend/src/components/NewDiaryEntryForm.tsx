import { useState } from 'react'
import { DiaryEntry, Visibility, Weather } from '../types'
import toNewDiaryEntry from '../utils/parsers'

interface Props {
  addEntry: (entry: Omit<DiaryEntry, 'id'>) => void;
}

const NewDiaryEntryForm = ({ addEntry }: Props) => {
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')

  const [date, setDate] = useState('')
  const [comment, setComment] = useState('')
  const [visibility, setVisibility] = useState('')
  const [weather, setWeather] = useState('')

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()

    try {
      const entry = toNewDiaryEntry({ date, comment, visibility, weather })
      addEntry(entry)

      setShow(false)

      setDate('')
      setComment('')
      setVisibility('')
      setWeather('')
    } catch (error) {
      let msg = 'Diary entry could not be added. '
      if (error instanceof Error) {
        msg += `Here's why: ${error.message}`
      }
      setError(msg)
      setTimeout(() => {
        setError('')
      }, 3000)
    }
  }

  return (
    <div>
      {show && 
        <div>
          <h3>Add new entry</h3>
          <form onSubmit={handleSubmit}>
            <label>date: </label>
            <input 
              onChange={(e) => setDate(e.target.value)}
              type="date"
              value={date}
            />
            <br />

            <label>visibility: </label>
            {Object.values(Visibility).map((v, i) =>
              <div key={i} style={{display: "inline"}}>
                <input
                  checked={visibility === v}
                  id={v}
                  onChange={(e) => setVisibility(e.target.value)}
                  type="radio"
                  value={v}
                />
                <label htmlFor={v}>{v}</label>
              </div>
            )}
            <br />

            <label>weather: </label>
            {Object.values(Weather).map((v, i) =>
              <div key={i} style={{ display: 'inline' }}>
                <input
                  checked={weather === v}
                  id={v}
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
            <br />

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <button type="submit">Add</button>
          </form>

          <button onClick={() => setShow(false)}>Close</button>
        </div>
      }

      {!show && <button onClick={() => setShow(true)}>New entry</button>}
    </div>
  )
}

export default NewDiaryEntryForm
