import { Image, ImageResponse } from '../../../../types'
import CarouselSkeleton from '../ImagesSkeleton/skeleton'
import React, { useState } from 'react'
import ScrollIndicator from './scrollindicator'
import { useEffect } from 'react'

const CarouselImages = ({
  images,
  responses,
}: {
  images: Image[]
  responses: ImageResponse[]
}) => {
  const target = React.useRef<HTMLDivElement | null>(null)
  const pictureRef = React.useRef<HTMLDivElement | null>(null)

  const [carouselRef, setCarouselRef] = useState(target)

  useEffect(() => {
    console.log(carouselRef.current)
    if (carouselRef.current)
      pictureRef.current = carouselRef.current.children[0] as HTMLDivElement
  })

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      console.log(entries[0].target)
      setCarouselRef(target)
    })
    if (carouselRef.current) observer.observe(carouselRef.current)
    return () => carouselRef.current && observer.unobserve(carouselRef.current)
  }, [carouselRef])

  if (responses && (responses[0].isLoading || responses[1].isLoading)) {
    return <CarouselSkeleton />
  }

  return (
    <div>
      <div
        ref={target}
        className='carousel carousel-center space-x-4 p-4 bg-accent snap'
      >
        {images.map((img) => (
          <div
            className='carousel-item w-4/5 md:w-3/5 lg:w-2/5'
            key={img ? img.id : undefined}
          >
            <img
              className='aspect-[3/2] object-fit border-1 border-gray-500 rounded-2xl'
              src={img ? img.url : undefined}
              alt='Animal'
            />
          </div>
        ))}
      </div>
      <ScrollIndicator target={carouselRef} photoRef={pictureRef} />
    </div>
  )
}

export default CarouselImages
