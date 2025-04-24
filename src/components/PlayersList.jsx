import { useState, useEffect } from "react";
import PlayerForm from "./PlayerForm.jsx";
import SinglePlayer from "./Player.jsx";
const cohortName = "2501-FTB-ET-WEB-PT";
const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players`;


function AllPlayers() {
  const [players, setPlayers] = useState([]);
  const [search, setSearch] = useState();

  const getPlayers = async () => {
    try{
    const response = await fetch(API_URL);
    const result = await response.json();
    return result.data.players;
  } catch (err) {
    console.error("Uh oh, trouble fetching players!", err);
  }
}

  useEffect(() => {
    async function fetchData() {
      const playersData = await getPlayers();
      setPlayers(playersData);
    }
    fetchData();
  }, []);

  const filteredPlayers = search
    ? players.filter((player) =>
        player.name.toLowerCase().includes(search.toLowerCase())
      )
    : players;

  return (
    <div>
      <h1>Puppy Bowl Players</h1>

      <PlayerForm setPlayers={setPlayers} />

      <div className="search">
        <h3>Search players by name</h3>
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="players-list">
        {filteredPlayers.map((player) => (
          <SinglePlayer key={player.id} player={player} setPlayers={setPlayers} />
        ))}
      </div>
    </div>
  );
}

export default AllPlayers