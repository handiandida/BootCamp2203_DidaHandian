import React from 'react'
import ReactDOM from "react-dom"
import App from './App'
import './index.css'
import Nav from "./nav"
import Increment from "./increment"
import 'bootstrap/dist/css/bootstrap.min.css'

function renderDOM(content, id) {
    ReactDOM.render(content, document.getElementById(id))
}

renderDOM(<App />, "root");
renderDOM(<Nav />, "nav");
renderDOM(<Increment />, "inc");


// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// )
