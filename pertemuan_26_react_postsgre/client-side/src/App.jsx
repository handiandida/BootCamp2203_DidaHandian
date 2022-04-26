import React from "react";
import './App.css'

import InputContacts from './components/inputContacts'
import ListContact from "./components/ListContact";

function App() {

  return (
    <>
    <div className="container">
      <InputContacts />
      <ListContact />
    </div>
    </>      
  )
}

export default App
