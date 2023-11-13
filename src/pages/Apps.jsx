import Card from '../components/Card';

const Apps = () => {
    return (
        <section>
            <h2>Apps</h2>
            <div className='games-container'>
                <Card title='Space Pad' img='' description='Manage your notes in a minimalist space-like page.' link='/spacePad' />
                <Card title='Price comparator' img='' description='Project made to manage information and organize it.' link='/comparator' />
            </div>
        </section >
    );
};

export default Apps;