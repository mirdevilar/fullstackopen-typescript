import { useEffect, useState } from 'react'

import DiaryEntriesSection from './components/DiaryEntriesSection'
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
      <DiaryEntriesSection entries={diaryEntries} />
    </>
  )
}

export default App
