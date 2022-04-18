import React from "react"
import ReactDOM from "react-dom"
import './style.css'

const element = <h1>This is React</h1>
ReactDOM.render(element, document.getElementById("root"))

const NavBar = (
    <header className='navbar'>
        <div className='navbar__title navbar__item'>BOOTCAMP Bacth 1 : Experiment with ReactJS</div>
        <div className='navbar__item'>Home</div>
        <div className='navbar__item'>About</div>
        <div className='navbar__item'>Contact</div>        
    </header>
);


ReactDOM.render(NavBar, document.getElementById('nav'));