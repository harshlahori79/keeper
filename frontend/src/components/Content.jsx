import React from "react";
import ReactDOM from "react-dom";

function Content(props){

    function handledlt()
    {
        props.onDelete(props.index);
        
    }
    return(
    <div class="notes">
    
    <h1>{props.title}</h1>
        <p>
            {props.message}
        </p>

        <button onClick={handledlt}>Delete</button>
    </div>
    )
}

export default Content;