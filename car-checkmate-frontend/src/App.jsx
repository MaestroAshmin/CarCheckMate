import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/scripts/LandingPage';
import CarInfoPage from './pages/scripts/CarInfoPage';
import SignUpPage from './pages/scripts/SignUpPage';
import SignInPage from './pages/scripts/SignInPage';
import ForgetPasswordPage from './pages/scripts/ForgetPasswordPage';
import CarAdPage from './pages/scripts/CarAdPage';
import CarBuildPage from './pages/scripts/CarBuildPage';
import CarFeaturePage from './pages/scripts/CarFeaturePage';
import CarPhotoPage from './pages/scripts/CarPhotoPage';
import CarLocationPage from './pages/scripts/CarLocationPage'
import CarPricePage from './pages/scripts/CarPricePage';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/CarInfoPage" element={<CarInfoPage />} />
          <Route path="/SignUpPage" element= {<SignUpPage/>} />
          <Route path="/SignInPage" element= {<SignInPage/>} />
          <Route path="/ForgetPasswordPage" element= {<ForgetPasswordPage/>} />
          <Route path="/CarAdPage" element={<CarAdPage/>} />
          <Route path="/CarBuildPage" element={<CarBuildPage/>}/>
          <Route path="/CarLocationPage" element={<CarLocationPage/>}/>
          <Route path="/CarPhotoPage" element={<CarPhotoPage/>}/>
          <Route path="/CarFeaturePage" element={<CarFeaturePage/>}/>
          <Route path="/CarPricePage" element={<CarPricePage/>}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
