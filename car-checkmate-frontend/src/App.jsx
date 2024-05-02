import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/scripts/LandingPage';
import Homepage from './pages/scripts/Homepage';
import AboutUs from './pages/scripts/AboutUs';
import CarAdPage from './pages/scripts/CarAdPage';
import CarBuildPage from './pages/scripts/CarBuildPage';
import CarFeaturePage from './pages/scripts/CarFeaturePage';
import CarPhotoPage from './pages/scripts/CarPhotoPage';
import CarLocationPage from './pages/scripts/CarLocationPage';
import CarPricePage from './pages/scripts/CarPricePage';
import CarInfoPage from './pages/scripts/Listing/CarInfoPage';
import CarInfo from './pages/scripts/Listing/CarInfo';
// import CarPostPage from './pages/scripts/Listing/CarPostPage';
//import Mechanic from './pages/scripts/Mechanic';
//import InspectionReport from './pages/scripts/InspectionReport';
import SellerMechanicsListingPage from './pages/scripts/SellerMechanicsListingPage';
import MechanicsListingPage from './pages/scripts/MechanicsListingPage';
import MechanicPage from './pages/scripts/MechanicPage';
import Mechanic from './pages/scripts/Mechanic';
import InspectionReport from './pages/scripts/InspectionReport';
import Seller from './pages/scripts/Seller';
import Selling from './pages/scripts/Selling';
import Buyer from './pages/scripts/Buyer';
import UserProfile from './pages/scripts/UserProfile';
import StyleTest from './pages/scripts/StyleTest';

import Listing from './pages/scripts/Listing/Listing';
import ListingPage from './pages/scripts/Listing/ListingPage';



function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/Homepage" element={<Homepage />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/Selling" element={<Selling />} />


          {/* Car listing */}   
          <Route path="/car/:_id" element={<CarInfoPage />} />
          <Route path="/seller-car/:_id" element={<CarInfo/>} />
          {/* <Route path="/listing" element={<CarPostPage />} /> */}
          {/*}<Route path="/CarAdPage" element={<CarAdPage />} />
          //<Route path="/CarBuildPage" element={<CarBuildPage />} />
          //<Route path="/CarLocationPage" element={<CarLocationPage />} />
          //<Route path="/CarPhotoPage" element={<CarPhotoPage />} />
          //<Route path="/CarFeaturePage" element={<CarFeaturePage />} />
          //<Route path="/CarPricePage" element={<CarPricePage />} />*/}

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
            
          {/** Login Page for each user */}
          <Route path="/Mechanic" element= {<Mechanic />} />
          <Route path="/InspectionReport" element= {<InspectionReport />} />
          <Route path="/Seller" element= {<Seller />} />
          <Route path="/Buyer" element= {<Buyer />} />
          <Route path="/UserProfile" element= {<UserProfile />} />

          {/** This is for testing the styling of the existing page */}
          <Route path="/StyleTest" element= {<StyleTest />} />
          <Route path="/ListingPage" element= {<ListingPage />} /> 
          <Route path="/Listing" element= {<Listing />} />
          {/* <SellerSchedule carId={car.id} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;