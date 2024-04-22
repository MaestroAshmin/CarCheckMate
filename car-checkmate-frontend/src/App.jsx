import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/scripts/LandingPage';
import Homepage from './pages/scripts/Homepage';
import CarInfoPage from './pages/scripts/CarInfoPage';
//import SignUpPage from './pages/scripts/SignUpPage'
//import SignInPage from './pages/scripts/SignInPage'
//import ForgetPasswordPage from './pages/scripts/ForgetPasswordPage';

import CarInfoPage from './pages/scripts/CarInfoPage';
import CarAdPage from './pages/scripts/CarAdPage';
import CarBuildPage from './pages/scripts/CarBuildPage';
import CarFeaturePage from './pages/scripts/CarFeaturePage';
import CarPhotoPage from './pages/scripts/CarPhotoPage';
import CarLocationPage from './pages/scripts/CarLocationPage'
import CarPricePage from './pages/scripts/CarPricePage';
import CarInfoPage from './pages/scripts/Listing/CarInfoPage';
import StyleTest from './pages/scripts/StyleTest';

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

          {/** This is for testing the styling of the existing page */}
          <Route path="/CarAdPage" element={<CarAdPage/>} />
          <Route path="/CarBuildPage" element={<CarBuildPage/>}/>
          <Route path="/CarLocationPage" element={<CarLocationPage/>}/>
          <Route path="/CarPhotoPage" element={<CarPhotoPage/>}/>
          <Route path="/CarFeaturePage" element={<CarFeaturePage/>}/>
          <Route path="/CarPricePage" element={<CarPricePage/>}/>
          <Route path="/StyleTest" element= {<StyleTest/>} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;