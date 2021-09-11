import React, { useContext, useState } from "react";
import contextValue from "../context/notes/NoteContext";


const AddNote = () => {
    const context = useContext(contextValue);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag)
        setNote({ title: "", description: "", tag: "default" })
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })

    }

    return <div className="container my-3">
        <h2>Add new note</h2>
        <form>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">
                    Title
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="title"
                    aria-describedby="emailHelp"
                    name="title"
                    onChange={onChange}
                    value={note.title}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="desc" className="form-label">
                    Description
                </label>
                <input
                    type="desc"
                    className="form-control"
                    id="desc"
                    name="description"
                    onChange={onChange}
                    value={note.description}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="tag" className="form-label">
                    Tag
                </label>
                <input
                    type="tag"
                    className="form-control"
                    id="tag"
                    name="tag"
                    onChange={onChange}
                    value={note.tag}
                />
            </div>

            <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleClick}>
                Add note
            </button>
        </form>

    </div>

}

export default AddNote;
