import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  //Get all notes
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM2NjVhMDQwYTVkOTE3NTFlMzM0NWUxIn0sImlhdCI6MTY2NzY1NDAzOH0.Wx9Rp-TTPLEBoORs4ttKJRcrHxf04QTl_X_2dPe87uE'
      }
    });
    const json = await response.json();
    setNotes(json);
  }

  //Add a new note
  const addNote = async (title, description, tag = "default") => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM2NjVhMDQwYTVkOTE3NTFlMzM0NWUxIn0sImlhdCI6MTY2NzY1NDAzOH0.Wx9Rp-TTPLEBoORs4ttKJRcrHxf04QTl_X_2dPe87uE'
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    console.log(json);

    const note = {
      "_id": "637241989eed9a6fd334281e",
      "user": "63665a040a5d91751e3345e1",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2022-11-14T13:24:40.591Z",
      "__v": 0
    }
    setNotes(notes.concat(note))
  }

  //Delete a note
  const deleteNote = async (id) => {

    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM2NjVhMDQwYTVkOTE3NTFlMzM0NWUxIn0sImlhdCI6MTY2NzY1NDAzOH0.Wx9Rp-TTPLEBoORs4ttKJRcrHxf04QTl_X_2dPe87uE'
      }
    });
    const json = await response.json();
    console.log(json);

    console.log("Deleting note with id :" + id);
    const newNote = notes.filter((note) => { return note._id !== id })
    setNotes(newNote)
  }

  //Edit a note
  const editNote = async (id, title, description, tag) => {

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM2NjVhMDQwYTVkOTE3NTFlMzM0NWUxIn0sImlhdCI6MTY2NzY1NDAzOH0.Wx9Rp-TTPLEBoORs4ttKJRcrHxf04QTl_X_2dPe87uE'
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = response.json;
    console.log(json);
    let newNotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider >
  )
}
export default NoteState;