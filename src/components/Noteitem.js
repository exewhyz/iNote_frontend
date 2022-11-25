import React, { useContext } from 'react'
import notecontext from '../context/notes/noteContext';
const NoteItem = (props) => {

    const context = useContext(notecontext);
    const { deleteNote } = context;
    const { notes, updateNote } = props;
    return (
        <div className='col-md-3'>
            <div className="card my-3">
                    <div className="card-body">
                        <div className="d-flex align-items-center">
                        <h5 className="card-title">{notes.title}</h5>
                        <i className="fa-regular fa-trash-can mx-3" onClick= {()=>{deleteNote(notes._id);props.showAlert("Note has been deleted Successfully", "success")}}></i>
                        <i className="fa-regular fa-pen-to-square" onClick= {()=>{updateNote(notes)}}></i>
                        </div>
                        <p className="card-text">{notes.description}</p>
                    </div>
            </div>
        </div>
    )
}

export default NoteItem