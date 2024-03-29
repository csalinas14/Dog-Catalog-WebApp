import { Image } from '../../../types'
import CarouselImages from './Images/image'
import Hero from './Hero/index'
import LandingPageBody from './Body'
import { useImages } from '../../hooks/useImages'
import {
  apiHeroCatImagesRequestLimit,
  apiHeroDogImagesRequestLimit,
} from '../../constants'

const LandingPage = () => {
  const catsResponse = useImages({
    animal: 'cat',
    page: '0',
    limitNumber: apiHeroCatImagesRequestLimit,
  })

  const dogsResponse = useImages({
    animal: 'dog',
    page: '0',
    limitNumber: apiHeroDogImagesRequestLimit,
  })

  const responses = [catsResponse, dogsResponse]

  const imageArray: Image[] = []
  for (let i = 0; i < catsResponse.imageInfo.length; i++) {
    imageArray.push(dogsResponse.imageInfo[i])
    imageArray.push(catsResponse.imageInfo[i])
  }
  imageArray.push(dogsResponse.imageInfo[dogsResponse.imageInfo.length - 1])
  console.log(imageArray)

  return (
    <div className='bg-base-200'>
      <Hero />
      <LandingPageBody />
      <CarouselImages images={imageArray} responses={responses} />
    </div>
  )
}

export default LandingPage
