import React from 'react';
import {Link} from "react-router-dom";
function Header() {
    return (
        <header>
            <Link to="/">
                <span class="material-symbols-outlined">
                    home
                </span>
            </Link>
        </header>
    );
}

export default Header;
