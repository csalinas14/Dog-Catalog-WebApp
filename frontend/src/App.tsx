//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import { Route, Routes, useParams } from 'react-router-dom'
import './index.css'
import LandingPage from './components/LandingPage'
import Navbar from './components/Navbar'
import DogsPage from './components/BreedsPage/dogs'
import CatsPage from './components/BreedsPage/cats'
import GalleryPage from './components/GalleryPage'
import Footer from './components/Footer/footer'
import { useEffect, useState } from 'react'
import ScrollToTop from './utils/scrollToTop'
import BreedPage from './components/SingleBreedPage'
import LoginPage from './components/Login/login'
import sessionService from './services/sessions'
import { UserSession } from '../types'

function App() {
  const success = useParams()
  console.log(success)
  useEffect(() => {
    //on page refresh window will start at top
    window.history.scrollRestoration = 'manual'
    const checkUserSession = async () => {
      const sessionS = sessionStorage.getItem('user')
      const localS = localStorage.getItem('user')
      console.log(sessionS)
      console.log(localS)
      if (sessionS !== null && localS !== null) {
        const storage = localS ? localS : sessionS
        const userSession = JSON.parse(storage)
        console.log(userSession.token)
        const activeSession = await sessionService.checkSession(
          userSession.token
        )
        console.log(activeSession)
      }
    }
    checkUserSession()
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
