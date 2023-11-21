import info from './info.json';

const getInformacion = () => {
    const datos = info;
    return datos;
};
 
const lista = getInformacion();

const AboutUs = () => {
    return (
        <section className="page-container">
            <div className="hero-container">
                <h2 className="hero-title">Alumnos:</h2>
                <article className="hero-section"> 
                          {lista.map((obj, index) => (
                            <div key={index}>
                              <p>NOMBRE: {obj.nombre}</p>
                              <p>INFORMACION: {obj.informacion}</p>
                              <p>REPOSITORIO GITHUB:{obj.user}</p>
                              <p>..</p>
                            </div>
                          ))}
                        
                </article>
            </div>
        </section>
    );
};

export default AboutUs;