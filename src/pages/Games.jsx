import Card from '../components/Card';

const Games = () => {
    return (
        <section>
            <h2 className="project-subtitle">Games</h2>
            <div className='games-container'>
                <Card title='Guess the animal!' imgSrc='./screenShots/GuessTheAnimal.png' description='A guessing game for children.' link='/guessGame' />
                <Card title='Punk Dude' imgSrc='./screenShots/PunkDude.png' description='Help punk anarchy! And eat sandwiches.' link='/punkDude' />
                <Card title='Blue Hope' imgSrc='./screenShots/BlueHope.png' description='In space the only hope is blue...' link='/spaceShooter' />
            </div>
        </section>
    );
};

export default Games;