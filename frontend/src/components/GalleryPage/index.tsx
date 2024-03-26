import { apiGalleryImagesRequestLimit } from '../../constants'
import { useImages } from '../../hooks/useImages'
import GallaryImages from './Images/images'

const GalleryPage = () => {
  const catsResponse = useImages({
    animal: 'cat',
    page: '0',
    limitNumber: apiGalleryImagesRequestLimit,
  })

  return (
    <div id='cat-pattern' className='pt-20 h-full'>
      <GallaryImages imageResponse={catsResponse} />
    </div>
  )
}

export default GalleryPage
