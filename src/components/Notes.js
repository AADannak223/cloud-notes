import React, { useContext, useEffect, useRef, useState } from "react";
import contextValue from "../context/notes/NoteContext";
import Noteitem from "./Noteitem";

const Notes = () => {
    const context = useContext(contextValue);
    const { notes, getNotes } = context;
    const [enote, esetNote] = useState({ etitle: "", edescription: "", etag: "default" })

    useEffect(() => {
        getNotes()
    }, [])

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote(currentNote)
    }

    const handleClick = (e) => {
        e.preventDefault();
        // updateNote(note.title, note.description, note.tag)
        getNotes()
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })

    }

    const ref = useRef(null)
    return (
        <>
            <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div class="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Edit note</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="etitle"
                                        value={note.title}
                                        aria-describedby="emailHelp"
                                        name="etitle"
                                        onChange={onChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edesc" className="form-label">
                                        Description
                                    </label>
                                    <input
                                        type="edesc"
                                        className="form-control"
                                        id="edesc"
                                        value={note.description}
                                        name="edescription"
                                        onChange={onChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">
                                        Tag
                                    </label>
                                    <input
                                        type="etag"
                                        className="form-control"
                                        id="etag"
                                        value={note.tag}
                                        name="etag"
                                        onChange={onChange}
                                    />
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Update note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h2> Your notes </h2>
                {notes.map((note) => {
                    return <Noteitem note={note} key={note._id} updateNote={updateNote} />
                })}
            </div>
        </>
    );
};

export default Notes;
