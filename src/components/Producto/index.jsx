import './style.css'

function Producto({ nombre, precio, distribuidor, categoria }) {
    return (
        <section >
            <div className='text-container'>
                <h3 className='nombre'>{nombre}</h3>
                <p className='precio'>{precio}</p>
                <p className='distribuidor'>{distribuidor}</p>
                <p className='categoria'>{categoria}</p>
            </div>
            
        </section>
    );
};

export default Producto;