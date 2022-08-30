import "./Header.css";
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header id="header">
            <h1 className="me">Lukas "Withakay" Nesittka</h1>
            <hr className="link-separator"/>
            <nav className="nav">
                <Link className="nav-link" to="/">Home</Link>
                    <hr className="nav-separators"/>
                <Link className="nav-link" to="/about">About Me</Link>
                    <hr className="nav-separators"/>
                <Link className="nav-link" to="/skills">My Skills</Link>
                    <hr className="nav-separators"/>
                <Link className="nav-link" to="projects">My Projects</Link>
                    <hr className="nav-separators"/>
                <Link className="nav-link" to="/contact">Contact Me</Link>
            </nav>
        </header>
    )
}

export default Header