import { useAppDispatch, useAppSelector } from '../../utils/redux_hooks'
import { checkSession, selectUser } from '../../reducers/usersReducer'
import { useMatch, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import img from '../../assets/hero-dog.jpg'

const UserPage = () => {
  const userMatch = useMatch('/user/:id')

  const userId = userMatch?.params.id

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const userState = useAppSelector(selectUser)
  console.log(userId)
  console.log(userState)

  //only can access your user page if logged in
  useEffect(() => {
    console.log('test')
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
        console.log(shortSession)
        dispatch(checkSession({ token: shortSession.token }))
      } else {
        console.log('last resort')
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
        <div className='flex flex-row'>
          <figure className='lg:w-2/5'>
            <img src={img} className='aspect-square rounded-full' />
          </figure>
          <div></div>
        </div>
      </div>
    </div>
  )
}

export default UserPage
