import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import notecontext from '../context/notes/noteContext';
import AddNote from './AddNote';
import Noteitem from './Noteitem';

const Notes = (props) => {
    let navigate = useNavigate();
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });
    const ref = useRef(null)
    const refClose = useRef(null)
    const context = useContext(notecontext);
    const { notes, getNotes, editNote } = context;
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes();
        }
        else {
            navigate("/login");
        }
        // eslint-disable-next-line
    }, []);
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    };
    const handleClick = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click();
        props.showAlert("Note has been updated Successfully", "success")
    };
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };
    return (
        <>
            <AddNote showAlert={props.showAlert} />
            <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
                Edit
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button disabled={note.etitle.length < 5 || note.edescription.length < 5} type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h2>Your Notes</h2>
                <div className="container mx-3">
                    <h5>{notes.length === 0 && 'No Notes To Display'}</h5>
                </div>
                {notes.map((notes) => {
                    return (
                        <Noteitem key={notes._id} updateNote={updateNote} showAlert={props.showAlert} notes={notes} />
                    )
                })}
            </div>
        </>
    )
}

export default Notes