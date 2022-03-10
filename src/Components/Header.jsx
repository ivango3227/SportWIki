import React from "react";
import {NavLink} from "react-router-dom";

function Header(){
    return(
        <header>
            <NavLink to="/" >
           <button><h1>SportsWiki</h1></button>
            
             </NavLink>
        </header>
    )
}
export default Header;