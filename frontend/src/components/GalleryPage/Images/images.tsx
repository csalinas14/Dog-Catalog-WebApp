import { Image, ImageResponse } from '../../../../types'
import GalleryImageSkeleton from '../ImageSkeleton/skeleton'
import { useAppSelector, useAppDispatch } from '../../../utils/redux_hooks'
import { selectUser } from '../../../reducers/usersReducer'
import { addFavorite } from '../../../reducers/favoritesReducer'

const GalleryImage = ({ img }: { img: Image }) => {
  const userState = useAppSelector(selectUser)
  const dispatch = useAppDispatch()

  const activeFavButton = userState.user ? '' : 'btn-disabled'

  const handleFavorite = (event: React.SyntheticEvent) => {
    event.preventDefault()

    //dispatch(addFavorite())
  }

  return (
    <div className='indicator w-fit'>
      <div className='indicator-item indicator-bottom indicator-end pr-4'>
        <button className={`btn btn-circle ` + activeFavButton}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
            />
          </svg>
        </button>
      </div>
      <img
        className='border-1 border-gray-500 rounded-xl shadow-md shadow-gray-500'
        src={img ? img.url : undefined}
        alt='Animal'
      />
    </div>
  )
}

const GallaryImages = ({ imageResponse }: { imageResponse: ImageResponse }) => {
  const images: Image[] = imageResponse.imageInfo

  //const activeFavButton = userState.user ? '' : 'btn-disabled'

  if (imageResponse.isLoading || imageResponse.isLoading) {
    return <GalleryImageSkeleton />
  }
  return (
    <div
      role='tabpanel'
      className='tab-content columns-1 p-4 gap-4 space-y-6 border-base-300 rounded-box sm:columns-2 md:columns-3 md:gap-8'
    >
      {images.map((img, i) => (
        <GalleryImage img={img} key={i} />
      ))}
    </div>
  )
}

export default GallaryImages
