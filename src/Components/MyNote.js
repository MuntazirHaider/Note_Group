import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import noteContext from '../context/NoteContext';

export default function MyNote(props) {

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    // Format date in dd/mm/yy
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = date.getUTCFullYear().toString().slice(-2);
    return `${day}/${month}/${year}`;
  };

  const context = React.useContext(noteContext)
  const {deleteNote} = context;
  const { note,editNote } = props;
  const date = formatDate(note.date);

  return (
    <React.Fragment>
      <Box sx={{
        border: 1, display: 'grid',
        gridTemplateRows: 'repeat(3, 0.3fr)', m: "auto", borderColor: 'primary.main', borderRadius: 1,
        width: 1 / 4, p: 2, fontWeight: 'h6.fontSize', fontFamily: 'default', flexDirection: 'row', alignItems: 'flex-start', boxShadow: "1px 1px 10px lightBlue", mt: "5%"
      }}>
        <Box sx={{mb:2}}>{note.title}</Box>
        <Box sx={{mb:1}}>{note.description}</Box>
        <Box sx={{ color: 'grey.500', pt: 1 }}>
          <item>{date}</item>
        </Box>
        <Box sx={{ mt: "3%" }}>
          <item> <Button  variant="outlined" onClick={()=>editNote(note)}>Update <EditNoteOutlinedIcon /></Button> </item>
          <item> <Button variant="outlined" onClick={()=>deleteNote(note._id)}>Delete <DeleteOutlineOutlinedIcon /></Button> </item>
        </Box>
      </Box>
    </React.Fragment>
  );
}