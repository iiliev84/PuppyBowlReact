import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
const cohortName = "2501-FTB-ET-WEB-PT";
const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players`;

function PlayerDetails() {
    
  const { id } = useParams();
  const [player, setPlayer] = useState(null);

 const getPlayerDetails = async (id) => {
    try{
        const response=await fetch(`${API_URL}/${id}`);
        const result = await response.json();
        return  result.data.player;
    } 
    catch(err) {
        console.log(err)
    }
}

  useEffect(() => {
    async function fetchPlayer() {
      const playerDetails = await getPlayerDetails(id);
      setPlayer(playerDetails);
    }
    fetchPlayer();
  }, [id]);

  if (!player) return <div>Loading player details</div>;

  return (
    <div className="player-details">
      <h2>{player.name}</h2>
      <p><strong>Breed:</strong> {player.breed}</p>
      <p><strong>Status:</strong> {player.status}</p>
      <img src={player.imageUrl} alt={player.name}/>
      <p><strong>Team:</strong>  {player.team ? player.team.name : "Unassigned"}</p>
      <Link to="/"> <button>Back</button> </Link>
    </div>
  );
}
export default PlayerDetails