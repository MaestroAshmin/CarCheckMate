import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LandingPage from './pages/scripts/LandingPage';
import CarInfoPage from './pages/scripts/CarInfoPage';
import ListingPage from './pages/scripts/ListingPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/carinfo" element={<CarInfoPage />} />
          <Route path="/listing" element={<ListingPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;