import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import MapView from "./components/MapView";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" Component={Login} />
        <Route path="/" Component={Dashboard} />
        <Route path="/map" Component={MapView} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
