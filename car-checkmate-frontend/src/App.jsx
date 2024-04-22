import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/scripts/LandingPage';
import CarInfoPage from './pages/scripts/Listing/CarInfoPage';
import SignUpPage from './pages/scripts/SignUpPage';
import SignInPage from './pages/scripts/SignInPage';
import ForgetPasswordPage from './pages/scripts/ForgetPasswordPage';
import StyleTest from './pages/scripts/StyleTest';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/CarInfoPage" element={<CarInfoPage />} />
          <Route path="/SignUpPage" element={<SignUpPage />} />
          <Route path="/SignInPage" element={<SignInPage />} />
          <Route path="/ForgetPasswordPage" element={<ForgetPasswordPage />} />
          <Route path="/StyleTest" element={<StyleTest />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;