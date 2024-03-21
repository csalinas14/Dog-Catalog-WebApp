import { useState, useEffect } from 'react'
import imageService from '../../services/images'
import { Image } from '../../../types'
import CarouselImages from './Images/image'
import heroDog from '../../assets/hero-dog.jpg'

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
      <div className='hero min-h-screen bg-base-200'>
        <div className='hero-content flex-col md:flex-row-reverse'>
          <img src={heroDog} className='max-w-sm rounded-lg shadow-2xl' />
          <div className='flex flex-col items-center md:items-start'>
            <h1 className='text-5xl font-bold md:text-left'>
              Pet Catalog for Everyone!
            </h1>
            <p className='py-6'>
              Interested in learning about pets? Look through our extensive pet
              catalog with all kinds of different dog and cat breeds. Find your
              favorite among all these adorable animals!
            </p>
            <button className='btn btn-primary'>Get Started</button>
          </div>
        </div>
      </div>

      <CarouselImages images={images} />
    </div>
  )
}

export default LandingPage
