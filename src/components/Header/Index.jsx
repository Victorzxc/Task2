import React from 'react';
import { Link } from "react-router-dom";
import './styles.css';
function Header() {
    return (
        <header>
            <Link to="/board">
                <span className="material-symbols-outlined">
                    home
                </span>
            </Link>
            <Link to="/">
                <button className="exit" onClick={() => localStorage.removeItem("priton")} >
                    Выйти
                </button>
            </Link>
        </header>
    );
}

export default Header;
