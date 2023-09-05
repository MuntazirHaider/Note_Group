import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AllNotes from './AllNotes';
import noteContext from '../context/NoteContext';
import { useEffect } from "react";


export default function Home() {
  const context = React.useContext(noteContext)
  const { allNote, allnotes } = context;
  useEffect(() => {
    allNote()
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <Typography lg={{ width: 1 }} sx={{ mt: 4, mb: 2 }} variant="h3" component="div" textAlign="center">All NOTES</Typography>
      <Box sx={{ flexGrow: 1, alignContent: 'space-around', justifyContent: 'space-around', display: 'flex', alignItems: 'center' }}>
        <Grid container columnSpacing={{ xs: 1, sm: 1, md: 2, lg: 3 }}>
          {allnotes.length === 0 && "Sorry Nothing To Display !!"}
          {allnotes.map((note) => {
            return <AllNotes key={note._id} note={note} />
          })}

        </Grid>
      </Box>
    </>
  );
}