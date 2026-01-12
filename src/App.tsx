import { Routes, Route } from 'react-router-dom'
import LandingPage from '@/pages/LandingPage'
import AreaPage from '@/pages/AreaPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/area/:areaId" element={<AreaPage />} />
    </Routes>
  )
}

export default App
