import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/scripts/LandingPage';
import Homepage from './pages/scripts/Homepage';
import CarInfoPage from './pages/scripts/CarInfoPage';
//import SignUpPage from './pages/scripts/SignUpPage'
//import SignInPage from './pages/scripts/SignInPage'
//import ForgetPasswordPage from './pages/scripts/ForgetPasswordPage';
import Listing from './pages/scripts/Listing';
import ListingPage from './pages/scripts/ListingPage';

// This is for testing the styling of the existing page. it can be removed when the implement phase is done
import StyleTest from './pages/scripts/StyleTest';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/Homepage" element={<Homepage />} />
          <Route path="/CarInfoPage" element={<CarInfoPage />} />
          {/*<Route path="/SignUpPage" element= {<SignUpPage/>} />*/}
          {/*<Route path="/SignInPage" element= {<SignInPage/>} />*/}
          {/*<Route path="/ForgetPasswordPage" element= {<ForgetPasswordPage/>} />*/}
          <Route path="/Listing" element={<Listing />} />
          <Route path="/ListingPage" element={<ListingPage />} />



          {/** This is for testing the styling of the existing page */}
          <Route path="/StyleTest" element= {<StyleTest/>} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
