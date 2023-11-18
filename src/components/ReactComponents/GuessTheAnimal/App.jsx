import React from 'react';
import './App.css';
import Start from './components/Start';

function App() {
    return (
        <>
            <section className='guess-the-animal-App'>
                <h2 id='title-game'>Guess the animal!</h2>
                <div className='gta-container'>
                    <Start />
                </div>
            </section>
        </>
    )
};

export default App;