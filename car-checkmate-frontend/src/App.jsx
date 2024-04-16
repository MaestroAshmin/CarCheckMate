import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/scripts/LandingPage';
import CarInfoPage from './pages/scripts/CarInfoPage';
import SignUpPage from './pages/scripts/SignUpPage'
import SignInPage from './pages/scripts/SignInPage'
import ForgetPasswordPage from './pages/scripts/ForgetPasswordPage';

// This is for testing the styling of the existing page. it can be removed when the implement phase is done
import StyleTest from './pages/scripts/StyleTest';

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

          {/** This is for testing the styling of the existing page */}
          <Route path="/StyleTest" element= {<StyleTest/>} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
