import Card from "../components/Card";

const Home = () => {
    return (
        <section className="page-container">
            <h2 className="project-subtitle">Home</h2>
            <p>Proyectos creados en el grupo 3 de la materia Fundamentos de Programación Web.</p>
            <p>De la Tecnicatura Universitaria en Desarrollo Integral de Videojuegos.</p>

            <div className="slider-container">
                <div className="slide-content">
                    <div className="card-wrapper">
                        <Card cardClass='carousel-card' title='Guess the animal!' imgSrc='./screenShots/GuessTheAnimal.png' link='/guessGame' />
                        <Card cardClass='carousel-card' title='Punk Dude' imgSrc='./screenShots/PunkDude.png' link='/punkDude' />
                        <Card cardClass='carousel-card' title='Blue Hope' imgSrc='./screenShots/BlueHope.png' link='/spaceShooter' />
                        <Card cardClass='carousel-card' title='Space Pad' imgSrc='./screenShots/SpacePad.png' link='/spacePad' />
                        <Card cardClass='carousel-card' title='Price comparator' imgSrc='./screenShots/PriceComparator.png' link='/comparator' />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Home;