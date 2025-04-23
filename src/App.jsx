
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AllPlayers from "./components/PlayersList";
import PlayerDetails from "./components/PlayerDetails";
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<AllPlayers />} />
          <Route path="/players/:id" element={<PlayerDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;