import { Routes, Route } from 'react-router-dom'
import LandingPage from '@/pages/LandingPage'
import AreaPage from '@/pages/AreaPage'
import MerchantPage from '@/pages/MerchantPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/area/:areaId" element={<AreaPage />} />
      <Route path="/area/:areaId/merchant/:merchantSlug" element={<MerchantPage />} />
    </Routes>
  )
}

export default App
