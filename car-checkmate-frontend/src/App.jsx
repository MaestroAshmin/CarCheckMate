import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/scripts/LandingPage';
import Homepage from './pages/scripts/Homepage';
import CarAdPage from './pages/scripts/CarAdPage';
import CarBuildPage from './pages/scripts/CarBuildPage';
import CarFeaturePage from './pages/scripts/CarFeaturePage';
import CarPhotoPage from './pages/scripts/CarPhotoPage';
import CarLocationPage from './pages/scripts/CarLocationPage';
import CarPricePage from './pages/scripts/CarPricePage';
import CarInfoPage from './pages/scripts/Listing/CarInfoPage';
import CarPostPage from './pages/scripts/Listing/CarPostPage';
import Mechanic from './pages/scripts/Mechanic';
import InspectionReport from './pages/scripts/InspectionReport';
import StyleTest from './pages/scripts/StyleTest';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/Homepage" element={<Homepage />} />
          {/* Car listing */}
          <Route path="/car/:carId" element={<CarInfoPage />} />
          <Route path="/listing" element={<CarPostPage />} />
          <Route path="/CarAdPage" element={<CarAdPage />} />
          <Route path="/CarBuildPage" element={<CarBuildPage />} />
          <Route path="/CarLocationPage" element={<CarLocationPage />} />
          <Route path="/CarPhotoPage" element={<CarPhotoPage />} />
          <Route path="/CarFeaturePage" element={<CarFeaturePage />} />
          <Route path="/CarPricePage" element={<CarPricePage />} />
          {/* Login Page for each user */}
          <Route path="/Mechanic" element={<Mechanic />} />
          <Route path="/InspectionReport" element={<InspectionReport />} />
          {/* Testing styling */}
          <Route path="/StyleTest" element={<StyleTest />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;