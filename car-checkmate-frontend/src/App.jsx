import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LandingPage from './pages/scripts/LandingPage';
import CarInfoPage from './pages/scripts/CarInfoPage';
import ListingPage from './pages/scripts/ListingPage';
import SignUpPage from './pages/scripts/SignUpPage'
import SignInPage from './pages/scripts/SignInPage'
import ForgetPasswordPage from './pages/scripts/ForgetPasswordPage';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/carinfo" element={<CarInfoPage />} />
          <Route path="/listing" element={<ListingPage />} />
          <Route path="/CarInfoPage" element={<CarInfoPage />} />
          <Route path="/SignUpPage" element= {<SignUpPage/>} />
          <Route path="/SignInPage" element= {<SignInPage/>} />
          <Route path="/ForgetPasswordPage" element= {<ForgetPasswordPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;