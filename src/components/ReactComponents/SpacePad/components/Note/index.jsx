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
                <button className='active-button sp-button' onClick={onToggleActive}>
                    {active ? 'Completed' : 'In process'}
                </button>
                <button className='delete-button sp-button' onClick={onDelete}>Delete</button>
            </div>
        </section>
    );
};

export default Note;