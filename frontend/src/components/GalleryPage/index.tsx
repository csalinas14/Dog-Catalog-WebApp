import { apiGalleryImagesRequestLimit } from '../../constants'
import { useImages } from '../../hooks/useImages'
import GallaryImages from './Images/images'
import GalleryPagination from './Pagination/pagination'
import { Image, ImageResponse } from '../../../types'

const GalleryPage = () => {
  const dogsResponse = useImages({
    animal: 'dog',
    page: '0',
    limitNumber: apiGalleryImagesRequestLimit,
  })

  const catsResponse = useImages({
    animal: 'cat',
    page: '0',
    limitNumber: apiGalleryImagesRequestLimit,
  })

  //below we combine both responses into one object for All images, loading, and errors
  const responseImageArray: Image[] = []
  for (let i = 0; i < apiGalleryImagesRequestLimit; i++) {
    responseImageArray.push(dogsResponse.imageInfo[i])
    responseImageArray.push(catsResponse.imageInfo[i])
  }

  const bothLoading: boolean = catsResponse.isLoading || dogsResponse.isLoading
  let bothErrors: string | undefined = undefined

  if (catsResponse.error && dogsResponse.error)
    bothErrors = catsResponse.error.concat(' ', dogsResponse.error)
  else if (catsResponse.error) bothErrors = catsResponse.error
  else if (dogsResponse.error) bothErrors = dogsResponse.error

  const bothResponses: ImageResponse = {
    imageInfo: responseImageArray,
    isLoading: bothLoading,
    error: bothErrors,
  }
  //tab returns All photos or a filtered list of dogs or cats
  return (
    <div id='cat-pattern' className='pt-20 h-full'>
      <div role='tablist' className='tabs tabs-bordered p-4'>
        <input
          type='radio'
          name='my_tabs_1'
          role='tab'
          className='tab'
          aria-label='All'
          defaultChecked={true}
        />
        <GallaryImages imageResponse={bothResponses} />

        <input
          type='radio'
          name='my_tabs_1'
          role='tab'
          className='tab'
          aria-label='Dogs'
        />
        <GallaryImages imageResponse={dogsResponse} />

        <input
          type='radio'
          name='my_tabs_1'
          role='tab'
          className='tab'
          aria-label='Cats'
        />
        <GallaryImages imageResponse={catsResponse} />
      </div>
      <GalleryPagination />
    </div>
  )
}

export default GalleryPage
