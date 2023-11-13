import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import ErrorPage from './pages/ErrorPageView';
import Games from './pages/Games';
import Apps from './pages/Apps';
import Navbar from './components/Navbar';
import SpaceShooter from './components/PhaserComponents/SpaceShooterScenes/index.jsx';
import PunkDude from './components/PhaserComponents/DudeScenes/index.jsx';
import GuessTheAnimal from './components/ReactComponents/GuessTheAnimal/Start.jsx';
import SpacePad from './components/ReactComponents/SpacePad/App.jsx';
import Calculadora from './components/ReactComponents/CalculadoraDePorcentajes/index.jsx';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/games" element={<Games />} />
        <Route path="/spaceShooter" element={<SpaceShooter />} />
        <Route path="/punkDude" element={<PunkDude />} />
        <Route path="/guessGame" element={<GuessTheAnimal />} />
        <Route path="/SpacePad" element={<SpacePad />} />
        <Route path="/calculadora" element={<Calculadora />} />
        <Route path="/apps" element={<Apps />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;