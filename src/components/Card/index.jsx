import { NavLink } from 'react-router-dom';
import './style.css';

function Card({ title, imgSrc, description, link }) {
    return (
        <section className='card-container'>
            <h3>{title}</h3>
            <img className='img-src' src={imgSrc} alt={title} />
            <p>{description}</p>
            <NavLink className={"to-the-page"} to={link}>Go to</NavLink>
        </section>
    )
};

export default Card;