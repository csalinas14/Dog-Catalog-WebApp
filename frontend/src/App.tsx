//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import { Route, Routes } from 'react-router-dom'
import './index.css'
import LandingPage from './components/LandingPage'
import Navbar from './components/Navbar'

console.log('app')

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path='/' element={<LandingPage />} />
      </Routes>
    </div>
  )
}

export default App
