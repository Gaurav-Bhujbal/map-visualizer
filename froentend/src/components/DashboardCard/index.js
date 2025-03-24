import "./index.css";
import { Link } from "react-router-dom";

const DashboardCard = (props) => {
  const { cardData } = props;
  return (
    <Link className="card-link" to={`/map-view/${cardData.id}`}>
      <li className="card">
        <div>
          <h2>{cardData.location}</h2>
          <p>lat: {cardData.lat}</p>
          <p>lng: {cardData.lng}</p>
        </div>
        <img alt={cardData.location} className="card-img" src={cardData.img} />
      </li>
    </Link>
  );
};

export default DashboardCard;
