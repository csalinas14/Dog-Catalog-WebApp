import { useState, useEffect } from 'react'
import imageService from '../../services/images'
import { Image } from '../../../types'
import CarouselImages from './Images/image'
import Hero from './Hero/index'

const LandingPage = () => {
  const [images, setImages] = useState<Image[]>([])

  useEffect(() => {
    const fetchImageList = async () => {
      const petObject = {
        animal: 'dog' as const,
        page: '0',
        limit: '4',
      }
      const dogImages = await imageService.getImages(petObject)
      const petObject2 = {
        animal: 'cat' as const,
        page: '0',
        limit: '3',
      }
      const catImages = await imageService.getImages(petObject2)

      const imageArray: Image[] = []
      for (let i = 0; i < catImages.length; i++) {
        imageArray.push(dogImages[i])
        imageArray.push(catImages[i])
      }
      imageArray.push(dogImages[dogImages.length - 1])
      setImages(imageArray)
    }

    void fetchImageList()
  }, [])

  console.log(images)

  return (
    <div>
      <Hero />
      <CarouselImages images={images} />
    </div>
  )
}

export default LandingPage
