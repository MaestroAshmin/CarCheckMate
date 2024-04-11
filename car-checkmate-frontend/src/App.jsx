import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/scripts/LandingPage';
import CarInfoPage from './pages/scripts/CarInfoPage';
import SignUpPage from './pages/scripts/SignUpPage'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/CarInfoPage" element={<CarInfoPage />} />
          <Route path="/SignUpPage" element= {<SignUpPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
