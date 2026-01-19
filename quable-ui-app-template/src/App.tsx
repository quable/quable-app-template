import { Box } from '@mui/material'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navigation } from './components/Navigation'
import { Home } from './pages/Home'
import { ConfigPage } from './pages/ConfigPage'
import { ProductsPage } from './pages/ProductsPage'
import './App.css'

function App() {
  return (
    <Router>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: '#f5f5f5',
        }}
      >
        <Navigation />
        <Box component="main" sx={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/config" element={<ConfigPage />} />
            <Route path="/products" element={<ProductsPage />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  )
}

export default App
