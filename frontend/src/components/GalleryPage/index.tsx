import { apiGalleryImagesRequestLimit } from '../../constants'
import { useImages } from '../../hooks/useImages'
import GallaryImages from './Images/images'
import GalleryPagination from './Pagination/pagination'
import { Image, ImageResponse } from '../../../types'
import { useSearchParams } from 'react-router-dom'
import { isNumeric } from '../../utils/functions'

const GalleryPage = () => {
  //setting up our page variables

  const [searchParams, setSearchParams] = useSearchParams()
  const page = searchParams.get('page')
  //const searchType = searchParams.get('type')
  let pageRequest
  let pageString: string
  if (!page || !isNumeric(page)) {
    pageRequest = '0'
    pageString = '1'
  } else {
    pageRequest = (Number(page) - 1).toString()
    pageString = page
  }

  //type variable
  const type = searchParams.get('type')
  let searchType
  switch (type) {
    case 'dog':
      searchType = 'dog'
      break
    case 'cat':
      searchType = 'cat'
      break
    default:
      searchType = 'all'
  }

  //our response objects
  const dogsResponse = useImages({
    animal: 'dog',
    page: pageRequest,
    limitNumber: apiGalleryImagesRequestLimit,
  })

  const catsResponse = useImages({
    animal: 'cat',
    page: pageRequest,
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
      <div
        role='tablist'
        className='tabs tabs-lifted p-4 font-semibold lg:tabs-lg'
      >
        <input
          type='radio'
          name='my_tabs_1'
          role='tab'
          className='tab '
          aria-label='All'
          defaultChecked={searchType === 'all' ? true : false}
          onClick={() => setSearchParams({ page: pageString, type: 'all' })}
        />
        <GallaryImages imageResponse={bothResponses} />

        <input
          type='radio'
          name='my_tabs_1'
          role='tab'
          className='tab'
          aria-label='Dogs'
          defaultChecked={searchType === 'dog' ? true : false}
          onClick={() => setSearchParams({ page: pageString, type: 'dog' })}
        />
        <GallaryImages imageResponse={dogsResponse} />

        <input
          type='radio'
          name='my_tabs_1'
          role='tab'
          className='tab'
          aria-label='Cats'
          defaultChecked={searchType === 'cat' ? true : false}
          onClick={() => setSearchParams({ page: pageString, type: 'cat' })}
        />
        <GallaryImages imageResponse={catsResponse} />
      </div>
      <GalleryPagination
        page={pageString}
        setPage={setSearchParams}
        type={searchType}
      />
    </div>
  )
}

export default GalleryPage
