import { FavoriteType, UserSession } from '../../../../types'
import {
  deleteFavorite,
  selectFavorites,
} from '../../../reducers/favoritesReducer'
import { useAppDispatch, useAppSelector } from '../../../utils/redux_hooks'

const FavoritesList = ({
  favorites,
  user,
}: {
  favorites: FavoriteType[] | null
  user: UserSession
}) => {
  const dispatch = useAppDispatch()
  const favState = useAppSelector(selectFavorites)

  const handleDelete = (event: React.SyntheticEvent, fav_id: number) => {
    event.preventDefault()
    dispatch(deleteFavorite({ token: user.token, fav_id }))
  }

  console.log('Favorites on User Page')
  console.log(favorites)
  console.log(user)
  if (!favorites) {
    return <div>No favorites</div>
  }
  return (
    <div className='my-8'>
      <h2 className='text-3xl font-semibold py-4'>Favorites</h2>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {favorites.map((fav) => (
          <figure
            className='aspect-square rounded-lg h-full w-full shadow-xl indicator'
            key={fav.image_id}
          >
            <div className='indicator-item indicator-top indicator-end pr-4'>
              <button
                className={`btn btn-circle bg-base-300`}
                onClick={(event) => handleDelete(event, fav.id)}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-6 h-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
                  />
                </svg>
              </button>
            </div>
            <img
              src={fav.image.url}
              className='h-full w-full object-center rounded-lg'
            />
          </figure>
        ))}
      </div>
    </div>
  )
}

export default FavoritesList
