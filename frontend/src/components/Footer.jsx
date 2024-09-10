import React from "react";
import ReactDOM from "react-dom";

function Footer(){
    const date  = new Date();
    const year = date.getFullYear();
    return(
        <footer>
        <p>copyright©{year}</p></footer>
    );
    
}

export default Footer; 