import './style.css';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className='nav-container'>
            <h1 className="title">GRUPO 3</h1>
            <ul className='nav-list'>
                <li>
                    <NavLink to={'/'} className='active-link'>Home</NavLink>
                </li>
                <li>
                    <NavLink to={'/games'} className='active-link'>Games</NavLink>
                </li>
                <li>
                    <NavLink to={'/apps'} className='active-link'>Apps</NavLink>
                </li>
                <li>
                    <NavLink to={'/about'} className='active-link'>About us</NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;