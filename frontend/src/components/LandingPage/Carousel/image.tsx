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
    let localRef: HTMLDivElement | null = null
    const observer = new ResizeObserver(() => {
      //console.log(entries[0].target)
      setCarouselRef(target)
    })
    if (carouselRef.current) observer.observe(carouselRef.current)
    localRef = carouselRef.current
    return () => {
      if (localRef) observer.unobserve(localRef)
    }
  }, [carouselRef])

  if (responses && (responses[0].isLoading || responses[1].isLoading)) {
    return (
      <div>
        <div className='px-8 sm:px-12 lg:px-28'>
          <div role='alert' className='alert bg-primary'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              className='stroke-info shrink-0 w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              ></path>
            </svg>
            <span>
              First load may take awhile. We apologize for any inconvenience.
            </span>
          </div>
        </div>
        <CarouselSkeleton />
      </div>
    )
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
