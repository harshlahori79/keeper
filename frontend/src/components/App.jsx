import React , {useState , useEffect} from "react";
import ReactDOM from "react-dom";
import Heading from"./Header";
import Content from "./Content"
import Footer from "./Footer";
import Inputarea from "./Inputarea" ; 


function App()
{
    const [notes , setnotes] = useState([]);
    useEffect(() => {
        const fetchNotes = async () => {
          try {
            const response = await fetch("http://localhost:8000/");
            const data = await response.json();
            console.log(data);
            setnotes(data);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchNotes();
      }, []);

    async function addnote(newNote)
    {
         setnotes(prevNotes=>{
            return [...prevNotes , newNote] 
         });
    }
const deleteNote = async (index) => {
    const noteToDelete = notes[index];
    try {
      const response = await fetch(`http://localhost:8000/notes/${noteToDelete._id}`, {
        method: 'DELETE',
      });
      window.location.reload();
      const data = await response.json();
      console.log(data);
      setnotes((prevNotes) => prevNotes.filter((note) => note._id !== noteToDelete._id));
    }catch (error) {
      console.error(error);
    }};
    return(
         <div>
         <Heading/>
         <Inputarea onAdd={addnote} />
        {   notes.map((neww , i) =>{
                return(
                <Content key={i}

                title={neww.title} 
                message ={neww.message}
                index={i}
                onDelete={deleteNote}
                />
                )
            }) }
         <Footer />
         </div>)
};
export default App;