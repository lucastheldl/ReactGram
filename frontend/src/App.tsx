import { useState } from 'react'
import './App.css'
//routes
import { BrowserRouter } from 'react-router-dom'
import { Router } from './Router'
//components
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'



function App() {

  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Router/>
      <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default App
