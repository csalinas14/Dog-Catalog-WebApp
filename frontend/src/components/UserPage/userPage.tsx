import { useAppSelector } from '../../utils/redux_hooks'
import { selectUser } from '../../reducers/usersReducer'
import { useMatch, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const UserPage = () => {
  const userMatch = useMatch('/user/:id')

  const userId = userMatch?.params.id

  const navigate = useNavigate()

  const userState = useAppSelector(selectUser)
  console.log(userId)

  //only can access your user page if logged in
  useEffect(() => {
    if (!(userState.user && userState.user.id.toString() === userId))
      navigate('/')
  })
  return <div className='pt-20 min-h-screen w-full'>{userState.user?.name}</div>
}

export default UserPage
