import React from 'react';
import { Link } from "react-router-dom";
import './styles.css';
function Header() {
    return (
        <header>
            <Link to="/">
                <span className="material-symbols-outlined">
                    home
                </span>
            </Link>
            <button onClick={localStorage.removeItem("priton")} >
                Выйти
            </button>
        </header>
    );
}

export default Header;
