import './style.css';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className='nav-container'>
            <h1 className="title">GRUPO 3</h1>
            <ul className='nav-list'>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/games">Games</Link>
                </li>
                <li>
                    <Link to="/spaceShooter">Blue Hope</Link>
                </li>
                <li>
                    <Link to="/punkDude">Punk Dude</Link>
                </li>
                <li>
                    <Link to="/apps">Apps</Link>
                </li>
                <li>
                    <Link to="/guessGame">GTA</Link>
                </li>
                <li>
                    <Link to="/spacePad">Space Pad</Link>
                </li>
                <li>
                    <Link to="/calculadora">Comparador</Link>
                </li>
                <li>
                    <Link to="/about">About Us</Link>
                </li>
            </ul>
        </nav>
    );
}