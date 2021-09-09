import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const initialNotes = [
    // {
    //   "_id": "613590140aeef7633f0699daf",
    //   "user": "613480dd76c1aa40a79c85b0",
    //   "title": "updated notes",
    //   "description": "This is my updated notess",
    //   "tag": "youtube",
    //   "date": "2021-09-06T03:50:44.044Z",
    //   "__v": 0
    // },
    // {
    //   "_id": "613833828e831170d2fb9dcd8",
    //   "user": "613480dd76c1aa40a79c85b0",
    //   "title": "second note",
    //   "description": "This is my second note",
    //   "tag": "public",
    //   "date": "2021-09-08T03:52:34.488Z",
    //   "__v": 0
    // },
    // {
    //   "_id": "613590140aeef7633f0699bdf",
    //   "user": "613480dd76c1aa40a79c85b0",
    //   "title": "updated notes",
    //   "description": "This is my updated notess",
    //   "tag": "youtube",
    //   "date": "2021-09-06T03:50:44.044Z",
    //   "__v": 0
    // },
    // {
    //   "_id": "613833828e831170d2fb9dgd8",
    //   "user": "613480dd76c1aa40a79c85b0",
    //   "title": "second note",
    //   "description": "This is my second note",
    //   "tag": "public",
    //   "date": "2021-09-08T03:52:34.488Z",
    //   "__v": 0
    // },
    // {
    //   "_id": "613590140aeef7633f0699drf",
    //   "user": "613480dd76c1aa40a79c85b0",
    //   "title": "updated notes",
    //   "description": "This is my updated notess",
    //   "tag": "youtube",
    //   "date": "2021-09-06T03:50:44.044Z",
    //   "__v": 0
    // },
    // {
    //   "_id": "613833828e831170d2fb9dod8",
    //   "user": "613480dd76c1aa40a79c85b0",
    //   "title": "second note",
    //   "description": "This is my second note",
    //   "tag": "public",
    //   "date": "2021-09-08T03:52:34.488Z",
    //   "__v": 0
    // },
    // {
    //   "_id": "613590140aeef7633f069k9df",
    //   "user": "613480dd76c1aa40a79c85b0",
    //   "title": "updated notes",
    //   "description": "This is my updated notess",
    //   "tag": "youtube",
    //   "date": "2021-09-06T03:50:44.044Z",
    //   "__v": 0
    // },

  ]
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
    console.log(json)
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
    console.log("this is json", json)

    console.log("Deleting the note with id" + id);
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  // Edit note
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzNDgwZGQ3NmMxYWE0MGE3OWM4NWIwIn0sImlhdCI6MTYzMDgzMTAzOX0.MOQP_OsEqOOS3SLUC_pY4nhf-oFo2lZuJowg68lE9pw"
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = response.json();

    // Logic to edit in client
    // for (let index = 0; index < notes.length; index++) {
    //   const element = notes[index];
    //   if (element._id === id) {
    //     element.title = title;
    //     element.description = description;
    //     element.tag = tag;
    //   }

    // }

  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>{props.children};</NoteContext.Provider>
  );
};
export default NoteState;
