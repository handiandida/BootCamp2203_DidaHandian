import React from "react"
import ReactDOM from "react-dom"
import Nav from "./nav"
import './style.css'
import MainContent from "./mainContent"
import Increment from "./increment"

function renderDOM(content, id) {
    ReactDOM.render(content, document.getElementById(id))
}

// const element = <h1>This is React</h1>
// ReactDOM.render(element, document.getElementById("root"))
// ReactDOM.render(<Nav />, document.getElementById('nav'));

renderDOM(<MainContent />, "root");
renderDOM(<Nav />, "nav");
renderDOM(<Increment />, "inc");