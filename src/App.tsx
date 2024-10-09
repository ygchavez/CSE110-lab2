
import { Label, Note  } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constant"; // Import the dummyNotesList from the appropriate module
import { ClickCounter } from "./hooksExercise";

import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
 return (
   <div className='app-container'>
     {/* inserted here */}
     <form className="note-form">
       <div><input placeholder="Note Title"></input></div>

       <div><textarea></textarea></div>

       <div><button type="submit">Create Note</button></div>
</form>

<div className="notes-grid">
       {dummyNotesList.map((note) => (
         <div
           key={note.id}
           className="note-item">
           <div className="notes-header">
             <button>x</button>
           </div>
           <h2> {note.title} </h2>
           <p> {note.content} </p>
           <p> {note.label} </p>
           
         </div>
       ))}
     </div>

     <ClickCounter/>

       <button>
         x
       </button>
       <h2> 1st Note Title </h2>
       <p> 1st Note Content </p>
       <p> 1st Note Label </p>
     </div>

 );
}

export default App;

