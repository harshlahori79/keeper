import React ,{useState} from "react" ;
function Inputarea(props)
{
    const [note , setNote] = useState({title:"" ,message:""});
    function handleChange(event)
    {
        const {name , value} = event.target;
        setNote({ ...note, [name]: value });
    }
    async function submitNote(even)
        {
            even.preventDefault(); 
           
           props.onAdd(note);
           const data = new URLSearchParams();
           data.append('title', note.title);
           data.append('message', note.message);
           const response = await fetch('http://localhost:8000', {
             method: 'POST',
             headers: {
               'Content-Type': 'application/x-www-form-urlencoded'
             }, 
             body: data.toString()
           });
           setNote({
            title:"" ,
            message:""
        })
        }
        return(
            <div class="inputarea">
            <form >
                <input class="content" onChange={handleChange} name="title" value={note.title} type="text" placeholder="Enter text here"></input>
                <textarea class="content" onChange={handleChange} name="message" value={note.message} rows="3" placeholder="Enter content"></textarea>
                <button onClick={(e)=>submitNote(e)}>Add </button>
            </form>
            </div>
        );
}
export default Inputarea;