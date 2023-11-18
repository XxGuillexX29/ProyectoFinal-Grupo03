import Card from '../components/Card';

const Apps = () => {
    return (
        <section>
            <h2 className="project-subtitle">Apps</h2>
            <div className='games-container'>
                <Card title='Space Pad' imgSrc='./screenShots/SpacePad.png' description='Manage your notes in a minimalist space-like page.' link='/spacePad' />
                <Card title='Price comparator' imgSrc='./screenShots/PriceComparator.png' description='Project made to manage information and organize it.' link='/comparator' />
            </div>
        </section >
    );
};

export default Apps;