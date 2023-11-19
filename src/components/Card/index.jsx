import { NavLink } from 'react-router-dom';
import './style.css';

function Card({ cardClass, title, imgSrc, description, link }) {
    return (
        <section className={`card-container ${cardClass}`}>
            <NavLink className={"to-the-page"} to={link}>
                <article className='card-content'>
                    <h3 className='card-title'>{title}</h3>
                    <div className='img-container'>
                        <img className='img-src' src={imgSrc} alt={title} />
                    </div>
                    <p>{description}</p>
                </article>
            </NavLink>
        </section>
    )
};

export default Card;