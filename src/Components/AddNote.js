import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import noteContext from '../context/NoteContext';
import { useState } from "react";

export default function AddNote() {
  const [note, setnote] = useState({title:"",description:""})
  const context = React.useContext(noteContext)
  const {addNote} = context;
  const onChange = (e) => {
    setnote({...note,[e.target.name] : e.target.value})
  }
  const handleAddNote = (e) => {
    e.preventDefault();
    addNote(note.title,note.description)
    setnote({title:"",description:""})
  }
  return (
    <React.Fragment>
      <Container fixed sx={{width:"50%"}}>
        <Box sx={{mt:15 ,  border: 1,  borderColor: 'primary.main', p:"5%", borderRadius: 1,boxShadow: "1px 1px 10px lightBlue"}}>
        <Typography variant="h5" gutterBottom sx={{fontWeight: 'light'}}>
        Add A New Note
      </Typography>
        <TextField fullWidth label="Title" id="fullWidth" sx={{pb:2}} placeholder='Enter The Title Of Your Note' name='title' value={note.title} required={true} onChange={onChange}/>
        <TextField id="fullWidth" label="Description" multiline fullWidth placeholder='Describe The Note' name='description' value={note.description} required={true} onChange={onChange}/>
        <Box sx={{mt:"2%"}}>
        <Button disabled={note.title.length < 4 || note.description.length <6} variant="outlined" sx={{mr:"2%"}} onClick={handleAddNote}>Add Note</Button>
        </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}