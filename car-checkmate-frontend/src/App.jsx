import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/scripts/LandingPage';
import CarAdPage from './pages/scripts/CarAdPage';
import CarBuildPage from './pages/scripts/CarBuildPage';
import CarFeaturePage from './pages/scripts/CarFeaturePage';
import CarPhotoPage from './pages/scripts/CarPhotoPage';
import CarLocationPage from './pages/scripts/CarLocationPage'
import CarPricePage from './pages/scripts/CarPricePage';
import CarInfoPage from './pages/scripts/Listing/CarInfoPage';
import MechanicsListingPage from './pages/scripts/MechanicsListingPage';
import MechanicPage from './pages/scripts/MechanicPage';
import StyleTest from './pages/scripts/StyleTest';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/CarInfoPage" element={<CarInfoPage />} />
          <Route path="/CarAdPage" element={<CarAdPage/>} />
          <Route path="/CarBuildPage" element={<CarBuildPage/>}/>
          <Route path="/CarLocationPage" element={<CarLocationPage/>}/>
          <Route path="/CarPhotoPage" element={<CarPhotoPage/>}/>
          <Route path="/CarFeaturePage" element={<CarFeaturePage/>}/>
          <Route path="/CarPricePage" element={<CarPricePage/>}/>
          <Route path="/MechanicsListingPage" element={<MechanicsListingPage/>}/> 
          <Route path="/MechanicPage/:itemId" element={<MechanicPage/>}/> 
          <Route path="/StyleTest" element={<StyleTest />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;