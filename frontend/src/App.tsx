//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import { Route, Routes, useSearchParams } from 'react-router-dom'
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
import UserPage from './components/UserPage/userPage'
import sessionService from './services/sessions'
import { UserSession } from '../types'
import Toast from './components/Toast/toast'
import { useAppSelector, useAppDispatch } from './utils/redux_hooks'
import { checkSession, selectUser } from './reducers/usersReducer'

function App() {
  const [searchParams] = useSearchParams()
  const success = searchParams.get('success')

  const userState = useAppSelector(selectUser)
  const dispatch = useAppDispatch()

  useEffect(() => {
    //on page refresh window will start at top
    window.history.scrollRestoration = 'manual'
    const sessionS = sessionStorage.getItem('user')
    const localS = localStorage.getItem('user')
    console.log(sessionS)
    console.log(localS)
    if (localS !== null) {
      //const storage = localS ? localS : sessionS
      const longerSession = JSON.parse(localS)
      //console.log(userSession.token)
      dispatch(checkSession({ token: longerSession.token }))
      //onsole.log(activeSession)
    } else if (sessionS) {
      const shortSession = JSON.parse(sessionS)
      console.log(shortSession)
      dispatch(checkSession({ token: shortSession.token }))
    }
    /*
    const checkUserSession = async () => {
      const sessionS = sessionStorage.getItem('user')
      const localS = localStorage.getItem('user')
      console.log(sessionS)
      console.log(localS)
      if (sessionS !== null && localS !== null) {
        const storage = localS ? localS : sessionS
        const userSession = JSON.parse(storage)
        console.log(userSession)
        console.log(userSession.token)
        console.log(activeSession)
      }
    }
    checkUserSession()
    */
  }, [dispatch])
  return (
    <div className='flex flex-col h-full'>
      <ScrollToTop />
      <Navbar />
      {success && userState.loading === 'succeeded' ? (
        <Toast type={'success'} message={'Logged In Successfully'} />
      ) : (
        <></>
      )}
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/dogs' element={<DogsPage />} />
        <Route path='/cats' element={<CatsPage />} />
        <Route path='/gallery' element={<GalleryPage />} />
        <Route path='/breeds/:id' element={<BreedPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/user/:id' element={<UserPage />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
