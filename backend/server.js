const express = require("express");
const app = express();
const cors = require("cors");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const port = 3000;

//middleware
app.use(cors());
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

  if (user === undefined) {
    response.status(401);
    return response.send({ error: "Invalid Username" });
  }

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
    img: "https://source.unsplash.com/400x300/?newdelhi",
  },
  {
    id: 2,
    location: "Mumbai",
    lat: 19.076,
    lng: 72.8777,
    img: "https://source.unsplash.com/400x300/?mumbai",
  },
  {
    id: 3,
    location: "Bangalore",
    lat: 12.9716,
    lng: 77.5946,
    img: "https://source.unsplash.com/400x300/?bangalore",
  },
  {
    id: 4,
    location: "Chennai",
    lat: 13.0827,
    lng: 80.2707,
    img: "https://source.unsplash.com/400x300/?chennai",
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

app.get("/api/map", authenticateUser, (request, response) => {
  response.send({ mapData });
});
