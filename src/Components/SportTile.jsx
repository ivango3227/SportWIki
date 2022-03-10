import React from "react";
import { useNavigate } from "react-router-dom";

function SportTile(props) {
    
    const Navigate=useNavigate();
    
    function handleClick(){
     const routeParam=props.name;
     Navigate("/sport/"+routeParam); 
    }
    
    return (
        <div className="sport-preview">
            <div>
                <h3>{props.name}</h3>
                <p>{(props.description).substring(0, 100)}...</p>
                <button onClick={()=>handleClick()} type="button">View more</button>
            </div>
                <img src={props.image} alt="failed to load" />
        </div>
    );
}
export default SportTile;