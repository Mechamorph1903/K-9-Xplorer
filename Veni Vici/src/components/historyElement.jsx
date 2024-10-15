import React from "react";

const HistoryElement = ({data}) => {
    const {url, breedName} = data;
    
    return (
        <>
            <h3>{breedName}</h3>
            <img src={url} alt="dog" width={80} height={80}/>
        </>
    )
}

export default HistoryElement;