import React from 'react';
import { Link } from "react-router-dom";
function Header() {
    return (
        <header>
            <Link to="/">
                <span className="material-symbols-outlined">
                    home
                </span>
            </Link>
        </header>
    );
}

export default Header;
