import React from "react";
import "./Cards.css"
 

function Cards({ name, image }) {

  
    return <img
        className="Cards"
        alt={name}
        src={image}
         />;
  }
  
  export default Cards;

