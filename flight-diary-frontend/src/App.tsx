import { useEffect, useState } from 'react'

import DiaryEntries from './components/DiaryEntries'
import diariesService from './services/diariesService'
import { DiaryEntry } from './types'

function App() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([])

  useEffect(() => {
    diariesService.getAll().then((data) => {
      setDiaryEntries(data)
    })
  }, [])

  return (
    <>
      <DiaryEntries entries={diaryEntries} />
    </>
  )
}

export default App
