import { useAppDispatch, useAppSelector } from '../../utils/redux_hooks'
import { checkSession, selectUser } from '../../reducers/usersReducer'
import { selectFavorites } from '../../reducers/favoritesReducer'
import { useMatch, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import img from '../../assets/hero-dog.jpg'
import FavoritesList from './FavoritesList/favoriteslist'

const UserPage = () => {
  const userMatch = useMatch('/user/:id')

  const userId = userMatch?.params.id

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const userState = useAppSelector(selectUser)
  const favoriteState = useAppSelector(selectFavorites)

  //only can access your user page if logged in
  useEffect(() => {
    if (userState.loading !== 'start') {
      if (!(userState.user && userState.user.id.toString() === userId))
        navigate('/')
    } else {
      const sessionS = sessionStorage.getItem('user')
      const localS = localStorage.getItem('user')

      if (localS !== null) {
        //const storage = localS ? localS : sessionS
        const longerSession = JSON.parse(localS)
        //console.log(userSession.token)
        dispatch(checkSession({ token: longerSession.token }))
        //onsole.log(activeSession)
      } else if (sessionS) {
        const shortSession = JSON.parse(sessionS)

        dispatch(checkSession({ token: shortSession.token }))
      } else {
        navigate('/')
      }
    }
  })

  if (!userState.user) {
    return <div></div>
  }

  return (
    <div className='pt-20 min-h-screen w-full'>
      <div className='flex flex-col px-20'>
        <div className='flex flex-col md:flex-row'>
          <figure className='md:w-2/5'>
            <img src={img} className='aspect-square rounded-full' />
          </figure>
          <div>
            <h1 className='font-semibold text-6xl'>
              Hello {userState.user.name}!
            </h1>
          </div>
        </div>
        <div>
          <FavoritesList
            favorites={favoriteState.favorites}
            user={userState.user}
          />
        </div>
      </div>
    </div>
  )
}

export default UserPage
