import "./index.css";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { ThreeDots } from "react-loader-spinner";
import DashboardCard from "../DashboardCard";

const apiStatusConstants = {
  initial: "INITAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCEESS",
  failure: "FAILURE",
};

const Dashboard = () => {
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.inProgress);
  const [dashboardData, setDashboardData] = useState([]);

  const jwtToken = Cookies.get("jwt_token");

  const getDashboardData = async () => {
    setApiStatus(apiStatusConstants.inProgress);

    const url = "https://map-visualizer.onrender.com/api/dashboard";
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    setDashboardData(data.dashboardData);
    setApiStatus(apiStatusConstants.success);
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  const renderDashboardCard = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return (
          <div className="loader-container">
            <ThreeDots color="#9880ff" />
          </div>
        );
        break;
      case apiStatusConstants.success:
        return (
          <ul className="card-container">
            {dashboardData.map((data) => (
              <DashboardCard key={data.id} cardData={data} />
            ))}
          </ul>
        );
    }
  };

  return (
    <div className="dashboard-bg-container">
      <div className="dashboard-body">
        <h1 className="dashboard-heading">Dashboard</h1>
        <div className="dashboard-card-container">{renderDashboardCard()}</div>
      </div>
    </div>
  );
};

export default Dashboard;
