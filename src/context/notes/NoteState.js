import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const initialNotes = []
  const [notes, setNotes] = useState(initialNotes)

  //Get all notes
  const getNotes = async () => {
    // API Call 
    const response = await fetch(`${host}/api/notes/fetchnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzNDgwZGQ3NmMxYWE0MGE3OWM4NWIwIn0sImlhdCI6MTYzMDgzMTAzOX0.MOQP_OsEqOOS3SLUC_pY4nhf-oFo2lZuJowg68lE9pw"
      }
    });
    const json = await response.json()
    setNotes(json)
  }

  // Add new note
  const addNote = async (title, description, tag) => {

    const response = await fetch(`${host}/api/notes/newnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzNDgwZGQ3NmMxYWE0MGE3OWM4NWIwIn0sImlhdCI6MTYzMDgzMTAzOX0.MOQP_OsEqOOS3SLUC_pY4nhf-oFo2lZuJowg68lE9pw"
      },
      body: JSON.stringify({ title, description, tag })

    });
    const note = await response.json();
    setNotes(notes.concat(note));



  }

  // Delete note
  const deleteNote = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzNDgwZGQ3NmMxYWE0MGE3OWM4NWIwIn0sImlhdCI6MTYzMDgzMTAzOX0.MOQP_OsEqOOS3SLUC_pY4nhf-oFo2lZuJowg68lE9pw"
      }
    });
    const json = response.json();
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  // Edit note
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzNDgwZGQ3NmMxYWE0MGE3OWM4NWIwIn0sImlhdCI6MTYzMDgzMTAzOX0.MOQP_OsEqOOS3SLUC_pY4nhf-oFo2lZuJowg68lE9pw"
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();


    // Logic to edit in client
    let newNote = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < notes.length; index++) {
      const element = newNote[index];
      if (element._id === id) {
        newNote[index].title = title;
        newNote[index].description = description;
        newNote[index].tag = tag;
        break;
      }

    }
    setNotes(newNote);

  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>{props.children};</NoteContext.Provider>
  );
};
export default NoteState;
