import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/scripts/LandingPage';

import CarAdPage from './pages/scripts/CarAdPage';
import CarBuildPage from './pages/scripts/CarBuildPage';
import CarFeaturePage from './pages/scripts/CarFeaturePage';
import CarPhotoPage from './pages/scripts/CarPhotoPage';
import CarLocationPage from './pages/scripts/CarLocationPage'
import CarPricePage from './pages/scripts/CarPricePage';
import CarInfoPage from './pages/scripts/Listing/CarInfoPage';
import SellerMechanicsListingPage from './pages/scripts/SellerMechanicsListingPage';
import MechanicsListingPage from './pages/scripts/MechanicsListingPage';
import MechanicPage from './pages/scripts/MechanicPage';
import Mechanic from './pages/scripts/Mechanic';
import InspectionReport from './pages/scripts/InspectionReport';
import StyleTest from './pages/scripts/StyleTest';
import Homepage from './pages/scripts/Homepage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/Homepage" element={<Homepage />} />
          <Route path="/CarInfoPage" element={<CarInfoPage />} />
          {/* <Route path="/SignUpPage" element= {<SignUpPage/>} />
          <Route path="/SignInPage" element= {<SignInPage/>} />
          <Route path="/ForgetPasswordPage" element= {<ForgetPasswordPage/>} /> */}

          {/** Car lising */}
          <Route path="/CarAdPage" element={<CarAdPage/>} />
          <Route path="/CarBuildPage" element={<CarBuildPage/>}/>
          <Route path="/CarLocationPage" element={<CarLocationPage/>}/>
          <Route path="/CarPhotoPage" element={<CarPhotoPage/>}/>
          <Route path="/CarFeaturePage" element={<CarFeaturePage/>}/>
          <Route path="/CarPricePage" element={<CarPricePage/>}/>
          <Route path="/SellerMechanicsListingPage" element={<SellerMechanicsListingPage/>}/> 
          <Route path="/MechanicsListingPage" element={<MechanicsListingPage/>}/> 
          <Route path="/MechanicPage/:itemId" element={<MechanicPage/>}/> 
          <Route path="/CarBuildPage" element={<CarBuildPage />}/>
          <Route path="/CarLocationPage" element={<CarLocationPage />}/>
          <Route path="/CarPhotoPage" element={<CarPhotoPage />}/>
          <Route path="/CarFeaturePage" element={<CarFeaturePage />}/>
          <Route path="/CarPricePage" element={<CarPricePage />}/>
          {/** Login Page for each user */}
          <Route path="/Mechanic" element= {<Mechanic />} />
          <Route path="/InspectionReport" element= {<InspectionReport />} />
          {/** This is for testing the styling of the existing page */}
          <Route path="/StyleTest" element= {<StyleTest />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;