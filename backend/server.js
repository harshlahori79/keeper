const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(cors());

 app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect('mongodb://127.0.0.1:27017/notesDB');
const notesSchema = new mongoose.Schema(
    {
        title : String ,
        message : String
    }
);
const Note = mongoose.model("Note" , notesSchema);
app.post("/" , function(req,res)
{
     console.log(req.body.note);
    const {title , message} = req.body;
    console.log(`Received note with title "${title}" and message "${message}"`);
    res.json('Note received!');
    const note = new Note(
        {
            title : `${title}` ,
            message : `${message}`
        }
    )
    note.save();
})


app.get("/", async (req, res) => {
    try {
      const notes = await Note.find();
      res.status(200).json(notes);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  app.delete('/notes/:id', async (req, res) => {
    try {
      const note = await Note.findByIdAndDelete(req.params.id);
      if (!note) {
        return res.status(404).send('Note not found');
      }
      res.send('Note deleted successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  });


app.listen(8000 , function()
{
    console.log("server is listening at port 8000")
})



//   app.put('/:id', async (req, res) => {
//     const id = req.params.id;
//     const updatedNote = req.body;
  
//     try {
//       const result = await Note.findByIdAndUpdate(id, updatedNote, { new: true });
//       res.json(result);
//     } catch (error) {
//       console.error(error);
//       res.status(500).send('Server error');
//     }
//   });
