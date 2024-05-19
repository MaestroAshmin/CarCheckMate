import React, { useState, useEffect } from "react";
import "../styles/main.css";
import "../styles/content.css";
import "../styles/admin.css";
import HeaderNav from "../../components/scripts/HeaderNav";
import AdminSellerManagement from "../../components/scripts/AdminSellerManagement";
import AdminBuyerManagement from "../../components/scripts/AdminBuyerManagement";
import AdminMechanicManagement from "../../components/scripts/AdminMechanicManagement";
import AdminListingManagement from "../../components/scripts/AdminListingManagement";
import AdminInspectionManagement from "../../components/scripts/AdminInspectionManagement";
import AdminPendingSellerVerification from "../../components/scripts/AdminPendingSellerVerification";
import AdminPendingMechanicVerification from "../../components/scripts/AdminPendingMechanicVerifications";

export default function AdminPage() {
  const [sellers, setSellers] = useState(0);
  const [buyers, setBuyers] = useState(0);
  const [mechanics, setMechanics] = useState(0);
  const [listings, setListings] = useState(0);
  const [inspections, setInspections] = useState(0);
  const [pendingSellerVerifications, setPendingSellerVerifications] = useState(0);
  const [pendingMechanicVerifications, setPendingMechanicVerifications] = useState(0);
  const [activeComponent, setActiveComponent] = useState("dashboard");

  // Fetch data from your API or data source
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch seller count
      const sellersResponse = await fetch("/api/users/count");
      const sellersCount = await sellersResponse.json();
      setSellers(sellersCount);

      // Fetch user count
      const buyersResponse = await fetch("/api/users/count");
      const buyersCount = await buyersResponse.json();
      setBuyers(buyersCount);

      // Fetch user count
      const mechanicsResponse = await fetch("/api/users/count");
      const mechanicsCount = await mechanicsResponse.json();
      setMechanics(mechanicsCount);

      // Fetch listing count
      const listingsResponse = await fetch("/api/listings/count");
      const listingsCount = await listingsResponse.json();
      setListings(listingsCount);

      // Fetch inspection count
      const inspectionsResponse = await fetch("/api/inspections/count");
      const inspectionsCount = await inspectionsResponse.json();
      setInspections(inspectionsCount);

      // Fetch pending seller verifications count
      const pendingSellerVerificationsResponse = await fetch("/api/pending-seller-verifications/count");
      const pendingSellerVerificationsCount = await pendingSellerVerificationsResponse.json();
      setPendingSellerVerifications(pendingSellerVerificationsCount);

      // Fetch pending mechanic verifications count
      const pendingMechanicVerificationsResponse = await fetch("/api/pending-mechanic-verifications/count");
      const pendingMechanicVerificationsCount = await pendingMechanicVerificationsResponse.json();
      setPendingMechanicVerifications(pendingMechanicVerificationsCount);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleComponentChange = (component) => {
    setActiveComponent(component);
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case "sellers":
        return <AdminSellerManagement />;
      case "buyers":
        return <AdminBuyerManagement />;
      case "mechanics":
        return <AdminMechanicManagement />;
      case "listings":
        return <AdminListingManagement />;
      case "inspections":
        return <AdminInspectionManagement />;
      case "pending-seller-verifications":
        return <AdminPendingSellerVerification />;
      case "pending-mechanic-verifications":
        return <AdminPendingMechanicVerification />;
      default:
        return (
          <div className="dashboard">
            <h2>Dashboard</h2>
            <div className="stats-container">
              <div className="row">
                <a
                  href="#"
                  onClick={() => handleComponentChange("sellers")}
                  className="stat-card blue"
                >
                  <h3>Sellers</h3>
                  <p>[ 8 ]</p>
                  {/* <p>{sellers}</p> */}
                </a>
                <a
                  href="#"
                  onClick={() => handleComponentChange("pending-seller-verifications")}
                  className="stat-card yellow"
                >
                  <h3>Pending Seller Verifications</h3>
                  <p>[ 0 ]</p>
                  {/* <p>{pendingSellerVerifications}</p> */}
                </a>
              </div>
              <div className="row">
              <a
                  href="#"
                  onClick={() => handleComponentChange("mechanics")}
                  className="stat-card blue"
                >
                  <h3>Mechanics</h3>
                  <p>[ 9 ]</p>
                  {/* <p>{mechanics}</p> */}
                </a>                
                <a
                  href="#"
                  onClick={() => handleComponentChange("pending-mechanic-verifications")}
                  className="stat-card yellow"
                >
                  <h3>Pending Mechanic Verifications</h3>
                  <p>[ 0 ]</p>
                  {/* <p>{pendingMechanicVerifications}</p> */}
                </a>
              </div>
              <div className="row">
                <a
                  href="#"
                  onClick={() => handleComponentChange("listings")}
                  className="stat-card green"
                >
                  <h3>Listings</h3>
                  <p>[ 98 ]</p>
                  {/* <p>{listings}</p> */}
                </a>
                <a
                  href="#"
                  onClick={() => handleComponentChange("buyers")}
                  className="stat-card blue"
                >
                  <h3>Buyers</h3>
                  <p>[ 10 ]</p>
                  {/* <p>{buyers}</p> */}
                </a>
                <a
                  href="#"
                  onClick={() => handleComponentChange("inspections")}
                  className="stat-card red"
                >
                  <h3>Inspections</h3>
                  <p>[ 12 ]</p>
                  {/* <p>{inspections}</p> */}
                </a>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="ctr-main">
      <div className="ctr-sub-content">
        <HeaderNav />
        <div className="admin-page">
          <div className="sidebar">
            <ul>
              <li>
                <a
                  href="#"
                  className={activeComponent === "dashboard" ? "active" : ""}
                  onClick={() => handleComponentChange("dashboard")}
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={activeComponent === "sellers" ? "active" : ""}
                  onClick={() => handleComponentChange("sellers")}
                >
                  Sellers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={activeComponent === "pending-seller-verifications" ? "active" : ""}
                  onClick={() => handleComponentChange("pending-seller-verifications")}
                >
                  Seller Verifications
                </a>
              </li>              
              <li>
                <a
                  href="#"
                  className={activeComponent === "mechanics" ? "active" : ""}
                  onClick={() => handleComponentChange("mechanics")}
                >
                  Mechanics
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={activeComponent === "pending-mechanic-verifications" ? "active" : ""}
                  onClick={() => handleComponentChange("pending-mechanic-verifications")}
                >
                  Mechanic Verifications
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={activeComponent === "buyers" ? "active" : ""}
                  onClick={() => handleComponentChange("buyers")}
                >
                  Buyers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={activeComponent === "listings" ? "active" : ""}
                  onClick={() => handleComponentChange("listings")}
                >
                  Listings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={activeComponent === "inspections" ? "active" : ""}
                  onClick={() => handleComponentChange("inspections")}
                >
                  Inspections
                </a>
              </li>
            </ul>
          </div>
          <div className="content">
            <div>{renderComponent()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}