const express = require('express');
const router = express.Router();
const loggeduser = require('../middleware/loggeduser')
const { body, validationResult } = require('express-validator');
const Note = require('../models/Note')

// Route:1 - Get loged in user notes "/notes/getnote"    (Login Required)
router.get('/getnote', loggeduser, async (req, res) => {
    try {
        // find all notes with same user id
        const notes = await Note.find({ user: req.user.id });
        // send all notes
        res.json(notes)
        // catch if some errors occured 
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Internal Error Occured")
    }
})

// Route:2 - Get all notes "/notes/getallnote"    (Login Not Required)
router.get('/getallnote', async (req, res) => {
    try {
        // get all notes 
        const notes = await Note.find({ });
        // send all notes
        res.json(notes)
        // catch if some errors occured 
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Internal Error Occured")
    }
})


// Route:3 - Add a new note  "/notes/addnote"    (Login Required)
router.post('/addnote', loggeduser, [
    // use express validator to check the correct input from new user
    body('title', 'The Length of title must be atleast 2').isLength({ min: 2 }),
    body('description', 'The Length of description must be atleast 5').isLength({ min: 5 })
], async (req, res) => {
    // if input is not valid return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        // destructure title and description from req'body
        const {title,description} = req.body;
        const note = new Note({
            title,description,user:req.user.id
        });
        // save a new note
        const newNote = await note.save();
        res.json(newNote);
        // catch if some errors occured 
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Internal Error Occured")
    }
})


// Route:4 - Update a note  "/notes/updatenote"    (Login Required)
router.put('/updatenote/:id', loggeduser, async (req, res) => {
    try {
        // destructure title and description from req'body
        const {title,description} = req.body;
        // create a new note object
        const updatedNote = {};
        // take inputs which need to be updated
        if(title){updatedNote.title = title};
        if(description){updatedNote.description = description};
        // find a note
        let note = await Note.findById(req.params.id);
        if(!note) return res.status(404).send("Note not found");
        // checking note is updated by valid user
        if(note.user.toString() !== req.user.id){
            if(!note) return res.status(401).send("Access Denied");
        }
        // finally update a note
        note = await Note.findByIdAndUpdate(req.params.id,{$set:updatedNote},{new:true});
        // send updated note
        res.json({note})
        // catch if some errors occured 
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Internal Error Occured")
    }
})


// Route:5 - Delete a note  "/notes/deletenote"    (Login Required)
router.delete('/deletenote/:id', loggeduser, async (req, res) => {
    try {
        // find a note
        let note = await Note.findById(req.params.id);
        if(!note) return res.status(404).send("Note not found");
        // checking note is deleted by valid user
        if(note.user.toString() !== req.user.id){
            if(!note) return res.status(401).send("Access Denied");
        }
        // finally delete a note
        note = await Note.findByIdAndDelete(req.params.id);
        // send a msg note is deleted
        res.send("Note is deleted");
        // catch if some errors occured 
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Internal Error Occured")
    }
})

module.exports = router