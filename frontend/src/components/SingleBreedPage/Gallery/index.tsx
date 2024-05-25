import { Image } from '../../../../types'
import { motion, Variants } from 'framer-motion'

const BreedInfoImage = ({ image }: { image: Image }) => {
  return (
    <figure className='aspect-square rounded-lg h-full w-full shadow-xl'>
      <img src={image.url} className='h-full w-full object-center rounded-lg' />
    </figure>
  )
}

const BreedInfoGallery = ({
  images,
  variants,
}: {
  images: Image[]
  variants: Variants
}) => {
  return (
    <motion.div
      initial='offscreen'
      whileInView='onscreen'
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div className='mt-8 mb-20' variants={variants}>
        <h2 className='text-3xl font-semibold py-4'>Check out some photos</h2>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
          {images.map((img) => (
            <BreedInfoImage image={img} key={img.id} />
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default BreedInfoGallery
