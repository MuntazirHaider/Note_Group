import * as React from 'react';
import Box from '@mui/material/Box';

const AllNotes = (props) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    // Format date in dd/mm/yy
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = date.getUTCFullYear().toString().slice(-2);
    return `${day}/${month}/${year}`;
  };
  const {note} = props
  const date = formatDate(note.date);
  return (
<>
      <Box sx={{
        border: 1, display: 'grid',
        gridTemplateRows: 'repeat(3, 0.3fr)', m: "auto", borderColor: 'primary.main', borderRadius: 1,
        width: 1 / 4, p: 2, fontWeight: 'h6.fontSize', fontFamily: 'default', flexDirection: 'row', alignitems: 'flex-start', boxShadow: "1px 1px 10px lightBlue", mt: "5%"
      }}>
        <Box sx={{mb:2}}>{note.title}</Box>
        <Box sx={{mb:1}}> {note.description}</Box>
        <Box sx={{ color: 'grey.500', pb: 1 }}>
          <item>Publish Date: {date}</item>
        </Box>
      </Box>
 </>

  )
}

export default AllNotes