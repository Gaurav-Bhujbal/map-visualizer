const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const port = 3000;

//middleware
app.use(cors({ origin: ["http://localhost:3000", "https://map-visualize.netlify.app"] }));
app.use(express.json());

//Starting a server

app.listen(3000, () => {
  console.log(`Server running on port 3000`);
});

//middleware to authenticate user

const authenticateUser = (request, response, next) => {
  const authHeader = request.headers["authorization"];
  let jwtToken;
  if (authHeader !== undefined) {
    jwtToken = authHeader.split(" ")[1];
  } else {
    return response.status(401).send({ error: "User not logged in" });
  }

  if (jwtToken === undefined) {
    return response.status(401).send({ error: "User not logged in" });
  } else {
    jwt.verify(jwtToken, "SECRET_KEY", async (error, payload) => {
      if (error) {
        return response.status(401).send({ error: "User not logged in" });
      } else {
        next();
      }
    });
  }
};

//LOGIN API

//Insted of DATABASE we are using Array for demo users

const usersData = [
  {
    id: 1,
    username: "Gaurav",
    hashedPassword:
      "$2b$10$8etRdJCTHRipn4aNeWRrz.cSl3peyUXjjwIQQU5KepnkFCo3cyb.K",
  },
  {
    id: 2,
    username: "Rahul",
    hashedPassword:
      "$2b$10$gAGISlmVIJngXv0AmRpFVeuGbIirH66uuDEsnPEQ8GeORjVkr3oM6",
  },
];

app.post("/api/login", async (request, response) => {
  const { username, password } = request.body;

  const user = usersData.filter((each) => each.username === username);

  if (user.length === 0)
    return response.status(401).json({ error: "Invalid Username" });

  const isMatch = await bcrypt.compare(password, user[0].hashedPassword);
  if (!isMatch) return response.status(401).json({ error: "Invalid Password" });

  const payload = {
    id: user[0].id,
    username: user[0].username,
  };
  const jwtToken = jwt.sign(payload, "SECRET_KEY");
  response.send({ jwt_token: jwtToken });
});

//Dashboard API

const dashboardData = [
  {
    id: 1,
    location: "New Delhi",
    lat: 28.6139,
    lng: 77.209,
    img: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVsaGl8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 2,
    location: "Mumbai",
    lat: 19.076,
    lng: 72.8777,
    img: "https://s7ap1.scene7.com/is/image/incredibleindia/marine-drive-mumbai-maharashtra-1-attr-nearby?qlt=82&ts=1727355144712",
  },
  {
    id: 3,
    location: "Bangalore",
    lat: 12.9716,
    lng: 77.5946,
    img: "https://www.vacationindia.com/wp-content/uploads/2020/10/a-majestic-view-of-a-grand-flyover-situated-in-bangalore.jpg",
  },
  {
    id: 4,
    location: "Chennai",
    lat: 13.0827,
    lng: 80.2707,
    img: "https://chennaimetrorail.org/wp-content/uploads/2024/03/cmrl-banner.jpg",
  },
];

app.get("/api/dashboard/", authenticateUser, (request, response) => {
  response.send({ dashboardData });
});

//Map View API

const mapData = [
  { id: 1, location: "New Delhi", lat: 28.6139, lng: 77.209, zoom: 5 },
  { id: 2, location: "Mumbai", lat: 19.076, lng: 72.8777, zoom: 5 },
  { id: 3, location: "Bangalore", lat: 12.9716, lng: 77.5946, zoom: 5 },
  { id: 4, location: "Chennai", lat: 13.0827, lng: 80.2707, zoom: 5 },
];

app.get("/api/map/:id", authenticateUser, (request, response) => {
  let { id } = request.params;
  id = parseInt(id);

  const locationData = mapData.filter((each) => each.id === id);
  response.send(locationData[0]);
});
