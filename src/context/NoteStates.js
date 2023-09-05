import React,{useState} from "react";
import noteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:8000"
  const notesinitial = []  
    const [allnotes, setallnotes] = useState(notesinitial)  
    const [userNote, setuserNote] = useState(notesinitial)


       // Get All Users Note
       const allNote = async()=>{
        //  API call
        const response = await fetch(`${host}/notes/getallnote`, {
          method: 'GET',
        });
        const json = await response.json()
        setallnotes(json) 
      } 



      // Get logged in user note
      const getNotes = async()=>{
        // API call
        const response = await fetch(`${host}/notes/getnote`, {
          method: 'GET',
          headers: {
            "auth-token": localStorage.getItem('token')
          },
        });
      const json = await response.json()
      setuserNote(json)
      } 

    // Add a note
    const addNote = async(title, description) => {
      // ToDo API call
      const response = await fetch(`${host}/notes/addnote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({title, description})
      });
     
      const note = await response.json()
      setuserNote(userNote.concat(note))
    }    

    // Delete a note
    const deleteNote = async(id)=>{
      //  API call
      const response = await fetch(`${host}/notes/deletenote/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        },
      });
      console.log(response);
      const newNote = userNote.filter((note)=>{return note._id!==id})
      setuserNote(newNote) 
    } 

    // Update a note
    const updateNote = async (id, title, description)=>{
      // API call
      const response = await fetch(`${host}/notes/updatenote/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({title, description})
      });
      console.log(response);
      let newNotes = JSON.parse(JSON.stringify(userNote))
      //Logic to edit in client
      for (let index = 0; index < userNote.length; index++) {
        const element = newNotes[index];
        if(element._id === id){
          newNotes[index].title = title;
          newNotes[index].description = description;
          break;
        }
      }
      setuserNote(newNotes);
    } 
    return (
        <noteContext.Provider value={{allnotes,setallnotes,userNote,setuserNote,addNote,deleteNote,updateNote,getNotes,allNote}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;