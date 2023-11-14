import './style.css';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className='nav-container'>
            <h1 className="title">GRUPO 3</h1>
            <ul className='nav-list'>
                <li>
                    <NavLink to={'/'} activeClassName='active-link'>Home</NavLink>
                </li>
                <li>
                    <NavLink to={'/games'} activeClassName='active-link'>Games</NavLink>
                </li>
                <li>
                    <NavLink to={'/apps'} activeClassName='active-link'>Apps</NavLink>
                </li>
                <li>
                    <NavLink to={'/about'} activeClassName='active-link'>About us</NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;