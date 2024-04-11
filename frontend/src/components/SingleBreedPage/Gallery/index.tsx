import { Image } from '../../../../types'

const BreedInfoImage = ({ image }: { image: Image }) => {
  return (
    <figure className='aspect-square rounded-lg h-full w-full shadow-xl'>
      <img src={image.url} className='h-full w-full object-center rounded-lg' />
    </figure>
  )
}

const BreedInfoGallery = ({ images }: { images: Image[] }) => {
  return (
    <div className='my-8'>
      <h2 className='text-3xl font-semibold py-4'>Check out some photos</h2>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {images.map((img) => (
          <BreedInfoImage image={img} />
        ))}
      </div>
    </div>
  )
}

export default BreedInfoGallery
