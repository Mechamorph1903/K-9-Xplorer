import React from "react";

const DisplayArea = ({data, onClick}) => {
    const { url, lifespan, temperament, dogWeight, breedName, dogHeight, breedGroup } = data;
    const handleClick = (e) => {
        // const clickedValue = e.target.innerText; // Get the text content of the clicked <p> tag
        onClick(e); // Pass it to the parent
    };
    return (
        <div className="dispArea">

            <h1>{breedName}</h1>
            <h3>Temperament: {temperament}</h3>
            <img src={url} alt="dog" width={300} height={300}/>
            <div className="statsBox">
            <p className="stats" onClick={() => handleClick(dogHeight)}>Height: {dogHeight} inches</p>
            <p className="stats" onClick={() => handleClick(dogWeight)}>Weight: {dogWeight} lbs</p>
            <p className="stats" onClick={() => handleClick(lifespan)}>Life Span: {lifespan}</p>
            <p className="stats" onClick={() => handleClick(breedGroup)}>Breed Group: {breedGroup}</p>
            </div>
        </div>
    )
}

export default DisplayArea;