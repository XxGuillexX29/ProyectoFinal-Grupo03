import './style.css';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className='nav-container'>
            <h1 className="nav-title">GRUPO 3</h1>
            <div className='nav-list'>
                <NavLink to={'/'} className='active-link'>Home</NavLink>
                <NavLink to={'/games'} className='active-link'>Games</NavLink>
                <NavLink to={'/apps'} className='active-link'>Apps</NavLink>
                <NavLink to={'/about'} className='active-link'>About us</NavLink>
            </div>
        </nav>
    );
};

export default Navbar;