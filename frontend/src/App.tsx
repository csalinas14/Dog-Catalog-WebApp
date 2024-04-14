//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import { Route, Routes } from 'react-router-dom'
import './index.css'
import LandingPage from './components/LandingPage'
import Navbar from './components/Navbar'
import DogsPage from './components/BreedsPage/dogs'
import CatsPage from './components/BreedsPage/cats'
import GalleryPage from './components/GalleryPage'
import Footer from './components/Footer/footer'
import { useEffect } from 'react'
import ScrollToTop from './utils/scrollToTop'
import BreedPage from './components/SingleBreedPage'
import LoginPage from './components/Login/login'

function App() {
  //on page refresh window will start at top
  useEffect(() => {
    window.history.scrollRestoration = 'manual'
  }, [])
  return (
    <div className='flex flex-col h-full'>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/dogs' element={<DogsPage />} />
        <Route path='/cats' element={<CatsPage />} />
        <Route path='/gallery' element={<GalleryPage />} />
        <Route path='/breeds/:id' element={<BreedPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
