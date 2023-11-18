import { useState } from 'react';
import Note from './components/Note/index.jsx';
import './style.css';

function App() {
  const noteObj = { title: '', description: '', importance: 'low', active: true };
  const importanceOptions = ['low', 'medium', 'high', 'urgent'];

  const [note, setNote] = useState(noteObj);
  const [notes, setNotes] = useState([]);
  const [filter, setFilter] = useState('all');

  //Save a note with the title and description and put it in notes array.
  const saveNote = () => {
    if (note.title.trim() !== '' && note.description.trim() !== '') {
      setNotes([...notes, note]);
      setNote({ title: '', description: '', importance: 'low', active: true });
    } else {
      alert('Please, complete the fields.');
    }
  };

  //Delete the note splicing the array.
  const deleteNote = (index) => {
    const newNotes = [...notes];
    newNotes.splice(index, 1);
    setNotes(newNotes);
  };

  //Make an action that active or unactive notes.
  const markNoteAsCompleted = (index) => {
    const updatedNotes = [...notes];
    updatedNotes[index].active = !updatedNotes[index].active;
    setNotes(updatedNotes);
  };

  //Input changer
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNote({ ...note, [name]: name === 'importance' ? value : value });
  };

  //Filter to see active or inactive notes
  const filteredNotes = notes.filter((item) => {
    if (filter === 'active') {
      return item.active;
    } else if (filter === 'inactive') {
      return !item.active;
    }
    return true;
  });

  return (
    <div className="space-pad-App">
      <h1 className="app-title">Space Pad</h1>

      <header className="app-header">
        <div className='note-creator-container'>
          <section className='note-inputs-container'>
            <h2 className='subtitle'>ADD A NOTE</h2>

            <input type="text" className="input" name="title" value={note.title} onChange={handleInputChange} placeholder='Title' />
            <input type="text" className="input" name="description" value={note.description} onChange={handleInputChange} placeholder='Description' />
            <select name="importance" className="input" value={note.importance} onChange={handleInputChange}>
              {importanceOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <button className="add-note-button" onClick={saveNote}>ADD NOTE</button>
          </section>
        </div>
      </header>

      <div className="notes-container">
        <section className='notes-section'>
          <h2>In process</h2>
          {filteredNotes.map((item, index) => (
            item.active && (
              <Note key={index} title={item.title} description={item.description} importance={item.importance} active={item.active}
                onToggleActive={() => markNoteAsCompleted(index)}
                onDelete={() => deleteNote(index)}
              />
            )
          ))}
        </section>

        <section className='notes-section'>
          <h2>Completed</h2>
          {filteredNotes.map((item, index) => (
            !item.active && (
              <Note key={index} title={item.title} description={item.description} importance={item.importance} active={item.active}
                onToggleActive={() => markNoteAsCompleted(index)}
                onDelete={() => deleteNote(index)}
              />
            )
          ))}
        </section>
      </div>
    </div>
  );
};

export default App;