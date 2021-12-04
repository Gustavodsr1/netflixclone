import React from "react";
import './Header.css';

export default ({black}) =>{
    return(
        <header className={black ? 'black' : ''}>
            <div className="header--logo">
                <a href="/">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix"></img>
                </a>
            </div>
            <div className="header--user">
                <img src="https://i.pinimg.com/564x/70/e3/75/70e375ba58795c9f2a326f700e91b665.jpg" alt="User"></img>
            </div>
        </header>
    )
}