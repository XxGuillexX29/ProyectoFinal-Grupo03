import './style.css'

function Note({ title, description, importance, active, onToggleActive, onDelete }) {
    return (
        <section className={active ? 'active-note container' : 'inactive-note container'}>
            <div className='text-container'>
                <h3 className='title'>{title}</h3>
                <p className='description'>{description}</p>
                <p className='importance'>PRIORITY: <span>{importance}</span></p>
            </div>
            
            <div className='note-buttons-container'>
                <button className='active-button' onClick={onToggleActive}>
                    {active ? 'Unactive' : 'Active'}
                </button>
                <button className='delete-button' onClick={onDelete}>Delete</button>
            </div>
        </section>
    );
};

export default Note;