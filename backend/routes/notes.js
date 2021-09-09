const express = require('express');
const router = express.Router();
const fetchuser = require('../models/middleware/fetchuser');
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator');


//fetching notes : GET "/api/auth/fetchnotes". login required 
router.get('/fetchnotes', fetchuser, async(req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes)

    } catch (error) {
        console.error(error.massage);
        res.status(500).send("Internal server error");
    }
})


//Add new notes: POST "/api/auth/newnote". login required 
router.post('/newnote', fetchuser, [
    body('title', 'Enter valid title').isLength({ min: 3 }), //title validation
    body('description', 'Description must be at least 5 character').isLength({ min: 5 }), //description validation  
], async(req, res) => {
    try {
        const { title, description, tag } = req.body;
        //If there are errors ruturn bad request and errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = await Notes.create({ //Creating notes
            title: title,
            description: description,
            tag: tag,
            user: req.user.id
        })

        res.json(note)

    } catch (error) {
        console.error(error.massage);
        res.status(500).send("Internal server error");
    }
})

//update notes: PUT "/api/auth/updatenote/:id". login required 
router.put('/updatenote/:id', fetchuser, async(req, res) => {
    try {
        const { title, description, tag } = req.body
            //Create newnote object
        const newnote = {}
        if (title) { newnote.title = title }
        if (description) { newnote.description = description }
        if (tag) { newnote.tag = tag }

        //Find the note to update
        const note = await Notes.findById(req.params.id)
        if (!note) {
            return res.status(404).send("not found")
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("request denied")
        }
        //Updating note
        let updatednote = await Notes.findByIdAndUpdate(req.params.id, { $set: newnote }, { new: true })
        res.json(updatednote)

    } catch (error) {
        console.error(error.massage);
        res.status(500).send("Internal server error");
    }

})


//delete notes: delete "/api/auth/updatenote/:id". login required 
router.delete('/deletenote/:id', fetchuser, async(req, res) => {
    try {

        let note = await Notes.findById(req.params.id)
        if (!note) {
            return res.status(404).send("not found")
        }

        //verifying user
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("request denied")
        }

        await Notes.findByIdAndDelete(req.params.id)
        res.send("note deleted successfully")

    } catch (error) {
        console.error(error.massage);
        res.status(500).send("Internal server error");

    }

})
module.exports = router