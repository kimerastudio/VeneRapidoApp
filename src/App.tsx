import { Routes, Route } from 'react-router-dom'
import LandingPage from '@/pages/LandingPage'
import AreaPage from '@/pages/AreaPage'
import MerchantPage from '@/pages/MerchantPage'
import VendeRapidoPage from '@/pages/VendeRapidoPage'
import ReparteConNosotrosPage from '@/pages/ReparteConNosotrosPage'
import CentroDeAyudaPage from '@/pages/CentroDeAyudaPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/area/:areaId" element={<AreaPage />} />
      <Route path="/area/:areaId/merchant/:merchantSlug" element={<MerchantPage />} />
      <Route path="/vende-rapido" element={<VendeRapidoPage />} />
      <Route path="/reparte-con-nosotros" element={<ReparteConNosotrosPage />} />
      <Route path="/ayuda" element={<CentroDeAyudaPage />} />
    </Routes>
  )
}

export default App
