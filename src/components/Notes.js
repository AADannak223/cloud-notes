import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import contextValue from "../context/notes/NoteContext";
import Noteitem from "./Noteitem";

const Notes = (props) => {
    let history = useHistory()
    const context = useContext(contextValue);
    const { notes, getNotes, editNote } = context;
    const [enote, esetNote] = useState({
        id: "",
        etitle: "",
        edescription: "",
        etag: "default",
    });

    useEffect(() => {
        console.log("localstorage items:", localStorage.getItem('token'))
        if (localStorage.getItem('token')) {
            getNotes();
        }
        else {
            history.push('/login')
        }

    }, []);

    const updateNote = (currentNote) => {
        ref.current.click();
        esetNote({
            id: currentNote._id,
            etitle: currentNote.title,
            edescription: currentNote.description,
            etag: currentNote.tag,
        });

    };

    // calling editNote note
    const handleClick = (e) => {
        e.preventDefault();
        editNote(enote.id, enote.etitle, enote.edescription, enote.etag);
        props.showAlert("Updated successfully", "success");
        refClose.current.click();
    };

    const onChange = (e) => {
        esetNote({ ...enote, [e.target.name]: e.target.value });
    };

    const ref = useRef(null);
    const refClose = useRef(null);
    return (
        <>
            <button
                type="button"
                className="btn btn-primary d-none"
                ref={ref}
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
            >
                Launch demo modal
            </button>

            <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                Edit note
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="etitle"
                                        value={enote.etitle}
                                        aria-describedby="emailHelp"
                                        name="etitle"
                                        onChange={onChange}
                                        minLength={5}
                                        required
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
                                        value={enote.edescription}
                                        name="edescription"
                                        onChange={onChange}
                                        minLength={5}
                                        required
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
                                        value={enote.etag}
                                        name="etag"
                                        onChange={onChange}
                                        onChange={onChange}
                                        minLength={5}
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                ref={refClose}
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button
                                disabled={
                                    enote.etitle.length < 5 || enote.edescription.length < 5
                                }
                                type="button"
                                className="btn btn-primary"
                                onClick={handleClick}
                            >
                                Update note
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h2> Your notes </h2>
                <div className="container">
                    {notes.length === 0 && "No notes to display"}
                </div>
                {notes.map((note) => {
                    return (
                        <Noteitem note={note} key={note._id} updateNote={updateNote} showAlert={props.showAlert} />
                    );
                })}
            </div>
        </>
    );
};

export default Notes;
