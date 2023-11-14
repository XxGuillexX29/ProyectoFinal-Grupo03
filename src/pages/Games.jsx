import Card from '../components/Card';

const Games = () => {
    return (
        <section>
            <h2>Games</h2>
            <div className='games-container'>
                <Card title='Guess the animal!' img='' description='A guessing game for children.' link='/guessGame' />
                <Card title='Punk Dude' img='' description='Help punk anarchy! And eat sandwiches.' link='/punkDude' />
                <Card title='Blue Hope' img='' description='In space the only hope is blue...' link='/spaceShooter' />
            </div>
        </section>
    );
};

export default Games;