import { useState } from "react";
const cohortName = "2501-FTB-ET-WEB-PT";
const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players`;


function PlayerForm({ setPlayers }) {

  const [form, setForm] = useState({
    name: "",
    breed: "",
    status: "bench",
    imageUrl: "" 
  });

    const addPlayer = async (newPlayer) => {
      try {
        const response = await fetch(`${API_URL}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPlayer),
        });
      } 
      catch (error) {
        console.log(error);
      }
    }

    const getPlayers = async () => {
      try{
      const response = await fetch(API_URL);
      const result = await response.json();
      return result.data.players;
    } catch (err) {
      console.error("Uh oh, trouble fetching players!", err);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addPlayer(form);
      const updatedPlayers = await getPlayers();
      setPlayers(updatedPlayers);
     
      setForm({
        name: "",
        breed: "",
        status: "bench",
        imageUrl: ""
      });
    } catch (error) {
      console.error("Error adding player:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="player-form">
      <h2>Add New Player</h2>
      <input
        type="text"
        placeholder="Enter Name"
        value={form.name}
        onChange={(e) => setForm({...form, name: e.target.value})}
        required
      />
      <spacer></spacer>
      <input
        type="text"
        placeholder="Enter Breed"
        value={form.breed}
        onChange={(e) => setForm({...form, breed: e.target.value})}
        required
      />
      <spacer></spacer>
      <input
        type="url" 
        placeholder="Paste Image Link:"
        value={form.imageUrl}
        onChange={(e) => setForm({...form, imageUrl: e.target.value})}
      />
      <spacer></spacer>
      <select
        value={form.status}
        onChange={(e) => setForm({...form, status: e.target.value})}
      >
        <option value="bench">Bench</option>
        <option value="field">Field</option>
      </select>
      <spacer></spacer>
      <button type="submit">Add Player</button>
    </form>
  );
}

export default PlayerForm