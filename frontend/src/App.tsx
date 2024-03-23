//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import { Route, Routes } from 'react-router-dom'
import './index.css'
import LandingPage from './components/LandingPage'
import Navbar from './components/Navbar'
import DogsPage from './components/BreedsPage/dogs'
import CatsPage from './components/BreedsPage/cats'

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/dogs' element={<DogsPage />} />
        <Route path='/cats' element={<CatsPage />} />
      </Routes>
    </div>
  )
}

export default App
