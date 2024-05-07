import { Image } from '../../../types'
import CarouselImages from './Carousel/image'
import Hero from './Hero/index'
import LandingPageBody from './Body'
import { useImages } from '../../hooks/useImages'
import {
  apiHeroCatImagesRequestLimit,
  apiHeroDogImagesRequestLimit,
} from '../../constants'
import CarouselBody from './Carousel/body'
import LandingPageEnding from './Ending'
import { Variants } from 'framer-motion'

const divVariants: Variants = {
  offscreen: {
    y: 150,
    opacity: 0,
  },
  onscreen: {
    y: 50,
    opacity: 1,
    transition: {
      delay: 0.2,
      type: 'spring',
      velocity: 30,
      mass: 0.5,
    },
  },
}

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

  return (
    <div className='bg-base-200'>
      <Hero variants={divVariants} />
      <LandingPageBody variants={divVariants} />
      <CarouselBody variants={divVariants} />
      <CarouselImages
        images={imageArray}
        responses={responses}
        variants={divVariants}
      />
      <LandingPageEnding variants={divVariants} />
    </div>
  )
}

export default LandingPage
