import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/scripts/LandingPage';
import CarInfoPage from './pages/scripts/CarInfoPage'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/CarInfoPage" element={<CarInfoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
