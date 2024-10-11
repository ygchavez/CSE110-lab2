import { Label, Note  } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constant"; // Import the dummyNotesList from the appropriate module
import { ClickCounter } from "./hooksExercise";
import React, { useState } from 'react'; 

//import React from 'react';
import logo from './logo.svg';
import './App.css';


const lightTheme = {
  background: '#FFC0CB',
  color: '#000000',
};

const darkTheme = {
  background: '#000435',
  color: '#000000',
}; 

function App() {

  //const [notes, setNotes] = useState(dummyNotesList);
  
  const [notes, setNotes] = useState(
    dummyNotesList.map(note => ({ ...note, isFavorite: false })) 
  );

  const [favorites, setFavorites] = useState<string[]>([]);

  const [isDarkMode, setIsDarkMode] = useState(false);

  const initialNote = {
    id: -1,
    title: "",
    content: "",
    label: Label.other,
    isFavorite: false,
  };

  const [createNote, setCreateNote] = useState(initialNote);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  


const toggleFavorite = (noteId: number) => {
  const updatedNotes = notes.map((note) => {
    if (note.id === noteId) {
      return { ...note, isFavorite: !note.isFavorite }; // Toggling favorite status
    }
    return note;
  });
  setNotes(updatedNotes);
      const favoriteNotes = updatedNotes.filter((note) => note.isFavorite).map((note) => note.title);
    setFavorites(favoriteNotes);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);  
  };

  const currentTheme = isDarkMode ? darkTheme : lightTheme;

  const createNoteHandler = (event: React.FormEvent) => {
    event.preventDefault();
    //console.log("title: ", createNote.title);
    //console.log("content: ", createNote.content);
    if (selectedNote){
      const updatedNotes= notes.map((note)=>
        note.id === selectedNote.id ? { ...note, ...createNote } : note);

      setNotes(updatedNotes);
      setSelectedNote(null);

    }
    else{
      const newNote = { ...createNote, id: notes.length + 1, isFavorite: false };
      setNotes([newNote, ...notes]);
    }


    
    
    // createNote.id = notes.length + 1;

  //   const newNote = { ...createNote, id: notes.length + 1, isFavorite: false };
  //   //setNotes([newNote, ...notes]);

  //   // Reset the form fields
  //  // setCreateNote(initialNote);
  //   setNotes([newNote, ...notes]);
    setCreateNote(initialNote);
  };

  const deleteNote = (noteId: number) => {
    const updatedNotes = notes.filter((note) => note.id !== noteId);// delete node 
    setNotes(updatedNotes);
  };

  // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   const { name, value } = event.target;
  //   setCreateNote({ ...createNote, [name]: value });
  // };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
  
    if (selectedNote) {
      // update the selectedNote
      setSelectedNote({ ...selectedNote, [name]: value });
    } else {
      //update the createNote state
      setCreateNote({ ...createNote, [name]: value });
    }
  };

  // const handleLabelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   setCreateNote({ ...createNote, label: event.target.value as Label });
  // };

  const handleLabelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const label = event.target.value as Label;
  
    if (selectedNote) {
      //update the label in selectedNote
      setSelectedNote({ ...selectedNote, label });
    } else {
      //update the label in createNote
      setCreateNote({ ...createNote, label });
    }
  };

  const handleSaveEdit = (updatedNote: Note) => {
    // Update the note in the notes array

    if (!selectedNote) return;
    
    const updatedNotes = notes.map((note) => {
      if (note.id === updatedNote.id) {
        return updatedNote;  // Replace
      }
      return note;  // Keep other notes as they are

    });
  //   setNotes(updatedNotes);
  //   setSelectedNote(null); // Deselect after saving
  // };


  setNotes(updatedNotes); 
  setSelectedNote(null);
  
  setCreateNote(initialNote);
  
  };

  const handleEditClick = (note: Note) => {
    setSelectedNote(note);
    setCreateNote(note);
  };

 return (
  <div className='app-container' style={{ background: currentTheme.background, color: currentTheme.color }}>
  {/* Toggle Theme Button */}
  
  <div className="header-section" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
  {/* <button onClick={toggleTheme}>Toggle Theme</button> */}
  <form className="note-form">...</form>
</div>

  
  <button onClick={toggleTheme} style={{ padding: '10px', marginBottom: '20px' }}>
    Toggle Theme
  </button>

  {/* Note form */}
  {/* <form className="note-form" style={{ background: currentTheme.background, color: currentTheme.color }}>
    <div><input placeholder="Note Title" /></div>
    <div><textarea placeholder="Note Content"></textarea></div>
    <div><button type="submit">Create Note</button></div>
  </form> */}

<form className="note-form" onSubmit={createNoteHandler} style={{ background: currentTheme.background, color: currentTheme.color }}>
      <div>
        <input
          placeholder="Note Title"
          value={createNote.title}
          onChange={(event) =>
            setCreateNote({ ...createNote, title: event.target.value })
          }
          required
        />
      </div>
      
      <div>
        <textarea
          placeholder="Note Content"
          value={createNote.content}
          onChange={(event) =>
            setCreateNote({ ...createNote, content: event.target.value })
          }
          required
        />
      </div>
      
      <div>
        <select
          value={createNote.label}
          onChange={(event) =>
            setCreateNote({ ...createNote, label: event.target.value as Label })
          }
          required
        >
          <option value={Label.personal}>Personal</option>
          <option value={Label.study}>Study</option>
          <option value={Label.work}>Work</option>
          <option value={Label.other}>Other</option>
        </select>
      </div>

      <div>
        <button type="submit">Create Note</button>
      </div>
    </form>

<div className="notes-grid">
      {notes.map((note) => (
        <div key={note.id} className="note-item">
          <div className="notes-header">
            <button onClick={() => toggleFavorite(note.id)}>
              {note.isFavorite ? '❤️' : '♡'} {/* Toggle between heart and noheart */}
            </button>
            <button onClick={() => deleteNote(note.id)}>x</button> {/* Delete button */}
            {/* <button>x</button> */}
          </div>
          <h2>{note.title}</h2>
          <p>{note.content}</p>
          <p>{note.label}</p>
          <button onClick={() => handleEditClick(note)}>Edit</button>
        </div>
      ))}
    </div>

     <ClickCounter/>

       <button>
         x
       </button>
       <h2>List of favorites:</h2>
      <ul>
        {favorites.map((title, index) => (
          <li key={index}>{title}</li>
        ))}
      </ul>
    </div>

 );
}

export default App;

