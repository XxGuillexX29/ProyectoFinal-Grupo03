import { NavLink } from 'react-router-dom';
import './style.css';

function Card({ title, img, description, link }) {
    return (
        <section className='card-container'>
            <h3>{title}</h3>
            <img src={img} alt={img} />
            <p>{description}</p>
            <NavLink to={link}>Go to</NavLink>
        </section>
    )
};

export default Card;