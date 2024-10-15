import { useState } from 'react'
import './App.css'
import DisplayArea from './components/displayArea'
import HistoryElement from './components/historyElement'
const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

function App() {
  const [currentDog, setCurrentDog] = useState({
    url: "",
    breeds: "",
    height: "",
    width: "",
    dogWeight: "",
    breedName: "",
    dogHeight: "",
    life_span: "",
    temperament: "",
    breedGroup: "",
  });

  const [isDisplayVisible, setIsDisplayVisible] = useState(false);

  const callAPI = async (query) => {
    const response = await fetch(query);
    const json = await response.json();
    console.log(json);
    return json;
  };

  const updateDogData = async () => {
    const data = await callAPI(`https://api.thedogapi.com/v1/images/search?limit=1&has_breeds=1&api_key=${ACCESS_KEY}`);
    if (data && data.length > 0) {
      const dog = data[0];
      setCurrentDog({
        url: dog.url,
        breeds: dog.breeds[0]?.name || "",
        height: dog.height,
        width: dog.width,
        dogWeight: dog.breeds[0]?.weight?.metric || "",
        breedName: dog.breeds[0]?.name || "",
        dogHeight: dog.breeds[0]?.height?.metric || "",
        lifespan: dog.breeds[0]?.life_span || "",
        temperament: dog.breeds[0]?.temperament || "",
        breedGroup: dog.breeds[0]?.breed_group || "",
      });
    }
  };

  const [clickedEvent, setClickedEvent] = useState([]);
  const [history, setHistory] = useState([]);

  // Callback function to handle the event click
  const handleEventClick = (eventData) => {
      
      setClickedEvent([...clickedEvent, eventData]); // Store the clicked event
  };
  
  const removeBanListItem = (index) =>
    {
      const updatedBanList = clickedEvent.filter((_, i) => i !== index);
      setClickedEvent(updatedBanList);
  }

  const handleHistory = (dog) => {
      
    setHistory([...history, <HistoryElement data={dog}/>]); // Store the clicked event
};

  return (
   <div className="app-container">
     <h1>Veni Vici!</h1>
     <h4>Discover man's best friend: Dogs!</h4>
    {isDisplayVisible && <DisplayArea data={currentDog} onClick={handleEventClick} />}
    <button onClick={() => {
      setIsDisplayVisible(true);
      updateDogData();
      handleHistory(currentDog);
    }}>🔀Discover!</button>
    
    {isDisplayVisible && (
  <div className="historyArea">
    <h1>History List</h1>
    <div id="historyItems">
      {history.length > 1 ? (
        history.slice(1).map((dog, index) => (
          <div id={index} className='historyElement'>{dog}</div>
        ))
      ) : (
        <p>No history yet! Discover some dogs first!</p>
      )}
    </div>
  </div>
)}

   {isDisplayVisible &&  <div className='banArea'>
      <h1>Ban List</h1>
     <div id='banItems'>
     {clickedEvent.map((event, index) => (
          <p key={index} onClick={() => removeBanListItem(index)} className='banlistItem'>{event}</p>
        ))}
     </div>
    </div>}
   </div>
  )
}

export default App
