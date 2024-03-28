import { Image, ImageResponse } from '../../../../types'
import CarouselSkeleton from '../ImagesSkeleton/skeleton'

const CarouselImages = ({
  images,
  responses,
}: {
  images: Image[]
  responses: ImageResponse[]
}) => {
  if (responses && (responses[0].isLoading || responses[1].isLoading)) {
    return <CarouselSkeleton />
  }
  return (
    <div>
      <div className='bg-base-200 py-20 px-8 sm:px-12 lg:px-28 '>
        <hr className='block w-48 h-1 border-0 bg-accent rounded-md mb-8' />
        <h2 className='flex flex-wrap text-xl font-semibold mb-8 lg:text-3xl lg:font-bold xl:text-5xl'>
          Explore all the
          <span className='text-accent'> &nbsp;breeds</span>
        </h2>
        <p className='mb-8 lg:text-md xl:text-2xl'>
          Explore a huge selection of breeds from the most playful, energetic,
          and intelligent breeds of dogs and cats. We incorporated a specialized
          API to provide you with interesting and accurate details about all of
          kinds of breeds. Immerse yourself through our extensive catalog and
          find your favorite new breed!
        </p>
        <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3'>
          <div className='card bg-base-100 rounded-2xl'>
            <div className='card-body'>
              <h3 className='text-md card-title'>Stunning Images</h3>
              <p className=''>
                Explore our immense collection of the most captivating dogs and
                cats --from the silliest dogs to most elegant purebred cats.
                Each image selected from our API showcases the beauty of owning
                one of these adorable creatures.
              </p>
            </div>
          </div>
          <div className='card bg-base-100 rounded-2xl'>
            <div className='card-body'>
              <h3 className='text-md card-title'>Stunning Images</h3>
              <p className=''>
                Explore our immense collection of the most captivating dogs and
                cats --from the silliest dogs to most elegant purebred cats.
                Each image selected from our API showcases the beauty of owning
                one of these adorable creatures.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='carousel carousel-center space-x-4 p-4 bg-accent'>
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
    </div>
  )
}

export default CarouselImages
