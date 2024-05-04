import React from 'react';
import {useState, useEffect} from "react";
import api from '../api'
import Note from '../components/Note.jsx'
import '../styles/Home.css'
const Home = () => {
    const [notes, setNotes] = useState([])
    const [content, setContent] = useState("")
    const [title, setTitle] = useState("")

    useEffect(() => {
        getNotes()
    }, []);
    const getNotes = () => {
        api.get("/api/notes/")
            .then((res) => res.data)
            .then((data) => {
                setNotes(data)
                console.log(data)
            }).catch((err) => alert(err))


    }


    const deleteNote = (id) => {
        api.delete(`/api/notes/delete/${id}/`).then((res) => {
            if (res.status === 204) alert("Note deleted")
            else alert("Failed to delete")
             getNotes()
        })
            .catch((error) => alert(error))


    }

    const createNote = (e) => {
        e.preventDefault()
        api.post(`/api/notes/`, {content, title}).then((res) => {
            if (res.status === 201) alert("Note created")
            else alert("Note hasn't been created")
        }).catch((err) => alert(err))
        getNotes()
    }
    return (
        <>

            <div>Notes</div>
            {notes.map((note) => (
  <Note key={note.id} note={note} onDelete={deleteNote} />
))}



            <h2>Create a note</h2>
            <form onSubmit={createNote}>
                <label htmlFor="title">Title: </label>
                <input type='text' id="title" name="title" required value={title}
                       onChange={(e) => setTitle(e.target.value)} />
<br/>
                <label htmlFor="content">Content: </label>
                <textarea id='content' name="content" value={content} required onChange={(e) => setContent(e.target.value)}>

                </textarea>

<br/>
                <input type='submit' value='Submit' />
            </form>
        </>
    );
};

export default Home;