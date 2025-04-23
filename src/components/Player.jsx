import { Link } from "react-router-dom";
const cohortName = "2501-FTB-ET-WEB-PT";
const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players`;

 function SinglePlayer({ player, setPlayers }) {

  const getPlayers = async () => {
    try{
    const response = await fetch(API_URL);
    const result = await response.json();
    return result.data.players;
  } catch (err) {
    console.error("Uh oh, trouble fetching players!", err);
  }
}

    const deletePlayer = async (playerId) => {
      try {
        const response = await fetch(`${API_URL}/${playerId}`, {
          method: "DELETE",
        });
        const result = await response.json();
        console.log(result);
      } 
      catch (err) {
        console.error(err);
      }
    }
  
  

  const handleDelete = async () => {
    try {
      await deletePlayer(player.id);
      const updatedPlayers = await getPlayers();
      setPlayers(updatedPlayers);
    } catch (err) {
      console.error("Error deleting player:", err);
    }
  };

  return (
    <div className="player-card">
      <h3>{player.name}</h3>
      <p>Breed: {player.breed}</p>
      <img src={player.imageUrl} alt={player.name} />
      <div>
        <Link to={`/players/${player.id}`}> Details </Link>
        <button onClick={handleDelete}> Delete </button>
      </div>
    </div>
  );
}
export default SinglePlayer