import * as React from 'react';
import AddNote from './AddNote';
import MyNote from './MyNote';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useContext,useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from '../context/NoteContext';
 
export default function Note() {
  const navigate = useNavigate();
  const context = useContext(noteContext)
  const {userNote,getNotes,updateNote} = context;
  const [open, setOpen] = useState(false);
  const [note, setnote] = useState({id:"",etitle:"",edescription:""})

  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }else{
      navigate('/LogIn')
    }
    // eslint-disable-next-line
  }, [])
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseAndUpdate = () => {
    updateNote(note.id,note.etitle,note.edescription)
    setOpen(false);
  };
  
  const editNote = (currNote) => {
    setOpen(true);
    setnote({id:currNote._id,etitle: currNote.title, edescription: currNote.description})
  }
  const onChange = (e) => {
    setnote({...note,[e.target.name] : e.target.value})
  }

  return (
    <React.Fragment>

        <AddNote  />

        <div>
      <Button variant="outlined" onClick={handleClickOpen} sx={{display:'none'}}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Update Your Note</DialogTitle>
        <DialogContent >
        <TextField fullWidth label="Title" id="fullWidth" sx={{pb:2}} name='etitle' value={note.etitle} onChange={onChange} minLengtn={2} placeholder='Edit The Title Of Your Note'/>
        <TextField id="fullWidth" label="Description" multiline fullWidth name='edescription' value={note.edescription} onChange={onChange} minLengtn={5} placeholder='Edit The Description Of Your Note'/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCloseAndUpdate}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
      
      <Grid maxWidth container columnSpacing={{ xs: 1, sm: 1, md: 2, lg:3}}>
        {userNote.length === 0 && "You don't have a note !!"}
      {userNote.map((note)=>{
        return <MyNote key={note._id} editNote={editNote} note={note}/> 
      })}
      </Grid>
      
    </React.Fragment>
  );
}