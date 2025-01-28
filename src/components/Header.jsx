import React from 'react';
import {Link} from "react-router-dom";
function Header() {
    return (
        <header>
            <Link to="/">
                <span className="material-symbols-outlined">
                  sentiment_satisfied_alt
                </span>
            </Link>
        </header>
    );
}

export default Header;
