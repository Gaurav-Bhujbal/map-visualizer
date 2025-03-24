import "./index.css";

const DashboardCard = (props) => {
  const { cardData } = props;
  console.log(cardData);
  return (
    <li className="card">
      <div>
        <h2>{cardData.location}</h2>
        <p>lat: {cardData.lat}</p>
        <p>lng: {cardData.lng}</p>
      </div>
      <img className="card-img" src='https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVsaGl8ZW58MHx8MHx8fDA%3D'/>
    </li>
  );
};

export default DashboardCard;
