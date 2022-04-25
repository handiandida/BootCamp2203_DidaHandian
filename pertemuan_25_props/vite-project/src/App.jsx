import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import Navbar from './components/navbar'
import Button from './components/button'

const App = () => {
  const nav = 'Dida Handian';

  const navHeading = 'Latihan Props';

  const clicked = () => {
    return alert('button di pencet')
  }

  return (
    <div className="App">
      <Navbar nav={nav} navHeading={navHeading}/>
      <Button clicked={clicked} />
    </div>
  )
}

export default App
